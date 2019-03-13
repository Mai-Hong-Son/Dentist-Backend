import { takeEvery, put, all, select } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import API from '../api/service';
import { invokeCallback } from '../actions/common';

const requestServices = createRequestSaga({
  request: API.all,
  tokenRequired: true,
  cancel: 'auth/removeIdentity',
  success: [
    ({ items }) => ({
      type: 'service/cache',
      payload: items
    })
  ]
});

function* loadServices(action) {
  const { loaded, items } = yield select(_ => _.service);

  const { args } = action;
  const callback = args[args.length - 1];

  // const items = [];

  // await fetch
  if (loaded) {
    yield put(
      invokeCallback(callback, null, {
        items,
        total: items.length
      })
    );
    return;
  }

  // call & wait
  yield put({
    type: 'service/requestServices',
    args: [
      {
        filters: {
          active: 1 // only show active services
        }
      },
      (err, data) => {
        if (data) {
          callback(null, data);
        } else {
          callback(err, []);
        }
      }
    ]
  });
}

const requestServiceIssueDetail = createRequestSaga({
  request: API.issueDetail,
  cancel: 'auth/removeIdentity',
  tokenRequired: true
});

export default [
  function* fetchServiceWatcher() {
    yield all([
      takeEvery('service/requestServices', requestServices),
      takeEvery('service/all', loadServices),
      takeEvery('service/issue_detail', requestServiceIssueDetail),
    ]);
  }
];
