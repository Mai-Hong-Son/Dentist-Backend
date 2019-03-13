import { call, put, take, race, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import I18n from 'react-native-i18n';
import { markRequestCancelled, invokeCallback } from '../actions/common';
import config from '../../constant';
import { removeIdentity } from '../actions/auth';

/**
 * rejectErrors
 */
export const rejectErrors = res => {
  const { status, data } = res;
  if (status >= 200 && status < 300) {
    return res;
  }
  /*eslint-disable*/
  // Error response example
  // {"error":{"statusCode":404,"name":"Error","message":"There is no method to handle GET /productss"}}
  /*eslint-enable*/
  return Promise.reject({
    statusCode: status || 600,
    message: data.message || res.problem,
    errors: data.errors || {}
  });
};

export const respondJson = res => res.data;

export const createRequestSaga = ({
  request,
  key,
  start,
  stop,
  success,
  failure,
  cancelled,
  timeout = config.TIMEOUT,
  cancel,
  // uploadProgress,
  // downloadProgress,
  // intervalProgress = 50,
  // blob

  tokenRequired = false
}) =>
  // when we dispatch a function, redux-thunk will give it a dispatch
  // while redux-saga will give it an action instead, good for testing
  // we may not needs this if we use redux-saga, of course we can use both
  function*(action) {
    // default is empty
    let args = action.args || [];
    // check to see if we have success callback that pass as a param,
    // so that it will be callback from where it was born
    // with this way we can make something like cleaning the messages
    const callback =
      typeof args[args.length - 1] === 'function'
        ? args[args.length - 1]
        : null;
    if (callback) {
      args = args.slice(0, -1);
    }
    // error first callback
    let ret = null;
    let err = null;

    // store into redux
    const requestKey = typeof key === 'function' ? key(...args) : key;
    // for key, we render unique key using action.args
    // but for actionCreator when callback, we should pass the whole action
    // so on event such as success, we can use action.type or action.args to
    // do next, example: addBook => success : (data, {args:[token]}) => loadBooks(token)
    if (start) {
      for (const actionCreator of start) {
        yield put(actionCreator());
      }
    }

    if (tokenRequired) {
      // prepare
      while (1) {
        yield put({ type: 'auth/prepareAccessToken' });

        // wait
        const {
          payload: { access_token }
        } = yield take('auth/prepareAccessToken_Done');

        if (access_token) {
          // check null ...
          args.unshift(access_token);
        } else {
          // can not fetch access_token, logout
          yield put(removeIdentity());
        }

        break;
      }
    }

    // mark pending
    // yield put(markRequestPending(requestKey));
    try {
      // this is surely Error exception, assume as a request failed
      if (!request) {
        throw new Error(I18n.t('systems.request.api_method_not_found'));
      }

      // start invoke
      const invokeRequest = async () => {
        const chainRequest = request.apply(request, args);
        // blob support progress
        // if (blob) {
        //   if (uploadProgress) {
        //     console.log(uploadProgress, intervalProgress);
        //     chainRequest = chainRequest.uploadProgress({
        //        interval: intervalProgress }, function* (
        //       uploaded,
        //       total
        //     ) {
        //       for (const actionCreator of uploadProgress) {
        //         yield put(actionCreator({ uploaded, total }, action));
        //       }
        //     });
        //   }

        //   if (downloadProgress) {
        //     chainRequest = chainRequest.progress({ interval: intervalProgress }, function* (
        //       downloaded,
        //       total
        //     ) {
        //       for (const actionCreator of downloadProgress) {
        //         yield put(actionCreator({ downloaded, total }, action));
        //       }
        //     });
        //   }
        //   chainRequest = chainRequest.then(res => res.json());
        // } else {
        //   // chain the request
        //   chainRequest = chainRequest
        //     .then(rejectErrors)
        //     // default return empty json when no content
        //     .then(respondJson);
        // }

        const response = await chainRequest;
        if (response.ok) {
          return response.data;
        }
        return rejectErrors(response);
      };

      // we do not wait forever for whatever request !!!
      // timeout is 0 mean default timeout, so default is 0 in case user input 0
      const raceOptions = {
        data: call(invokeRequest),
        isTimeout: call(delay, timeout)
      };
      if (cancel) {
        raceOptions.cancelRet = take(cancel);
      }
      const { data, isTimeout, cancelRet } = yield race(raceOptions);
      if (isTimeout) {
        throw new Error(
          I18n.t('systems.request.timeout', { duration: timeout })
        );
        // throw new Error(`Api method is timeout after ${timeout} ms!!!`);
      } else if (cancelRet) {
        // callback on success
        if (cancelled) {
          for (const actionCreator of cancelled) {
            yield put(actionCreator(cancelRet, action));
          }
        }
        // mark cancelled request
        yield put(markRequestCancelled(cancelRet, requestKey));
      } else {
        // callback on success
        if (success) {
          for (const actionCreator of success) {
            yield put(actionCreator(data, action));
          }
        }
        // finally mark the request success
        // yield put(markRequestSuccess(requestKey));

        // assign data, for cancel both ret and err is null
        ret = data;
      }
    } catch (reason) {
      // unauthorized

      if (reason.statusCode === 401) {
        yield put(removeIdentity());
      }

      // if (reason.status === 401) {
      //   // try refresh token
      //   const token = action.args[0];
      //   // catch exception is safer than just read response status
      //   if (token && token.refreshToken) {
      //     // tell user to wait, no need to catch for more errors this step!!!
      //     yield put(setToast('Refreshing token... You should reload page for sure!'));
      //     // try refresh token, then reload page ?
      //     const { token: newToken } = yield call(auth.refreshAccessToken, token.refreshToken);
      //     // it can return more such as user info, expired date ?
      //     // call action creator to update
      //     yield put(saveRefreshToken(newToken));
      //   } else {

      // call logout user because we do not have refresh token
      // yield put(removeLoggedUser());
      // yield put(setAuthState(false));
      // yield put(forwardTo('login'));
      //   }
      // }
      // anyway, we should treat this as error to log
      if (failure) {
        for (const actionCreator of failure) {
          yield put(actionCreator(reason, action));
        }
      }
      // yield put(markRequestFailed(reason, requestKey));

      // mark error
      err = reason;
    } finally {
      if (stop) {
        for (const actionCreator of stop) {
          yield put(actionCreator(ret, action));
        }
      }
      // check if the last param is action, should call it as actionCreator
      // from where it is called, we can access action[type and args],
      // so we will use it with first error callback style
      if (callback) {
        yield put(invokeCallback(callback, err, ret));
      }
    }
  };
