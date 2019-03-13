import { takeLatest, all, put, select, takeEvery } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import API from '../api/notification';
import screenPayload from '../actions/screen';
import { listNotification } from '../actions/notification';

const requestFetchNotification = createRequestSaga({
  request: API.fetchNotifications,
  tokenRequired: true,
  success: [
    data => ({
      type: 'notification/updateList',
      payload: {
        criterial: {
          page: data.current,
          page_size: data.limit
        },
        data
      }
    }),

    () => ({
      type: 'notification/stopRefreshing'
    }),
    () => ({
      type: 'notification/stopLoadMore'
    }),
    () => ({ type: 'notification/countUnread' })
  ]
});

const requestDeleteNotification = createRequestSaga({
  request: API.deleteNotifications,
  tokenRequired: true,
  success: [
    () => ({
      type: 'notification/init'
    })
  ]
});

const requestDeleteAllNotification = createRequestSaga({
  request: API.deleteAllNotification,
  tokenRequired: true,
  success: [() => ({ type: 'notification/init' })]
});

const requestTotalOfUnreadInternal = createRequestSaga({
  request: API.fetchNotifications,
  tokenRequired: true,
  success: [
    ({ total_record }) =>
      screenPayload('notifications', { total: total_record })
  ]
});

function* requestTotalOfUnread() {
  yield put({
    type: 'notification/countUnread@internal',
    args: [
      {
        page_size: 0,
        filters: {
          status: 1
        }
      }
    ]
  });
}

const requestMarkAsReadNotification = createRequestSaga({
  request: API.markAsReadNotification,
  tokenRequired: true
});

function* initNotification() {
  // yield mark loading
  // yield refrshing ..
  yield put({
    type: 'notification/refreshing'
  });

  const criterial = yield select(_ => _.notification.criterial);
  yield put(
    listNotification({
      ...criterial,
      page: 1
    })
  );
}

function* loadMoreNotification() {
  const notification = yield select(_ => _.notification);

  // nextable
  if (notification.data.total > notification.criterial.page) {
    const newCriterial = {
      ...notification.criterial,
      page: notification.criterial.page + 1
    };

    yield put({
      type: 'notification/markLoadMore'
    });

    yield put(listNotification(newCriterial));
  }
}

export default [
  function* fetchWatchers() {
    yield all([
      takeLatest('notification/init', initNotification),
      takeLatest('notification/list', requestFetchNotification),
      takeLatest('notification/loadMore', loadMoreNotification),

      takeLatest('notification/delete', requestDeleteNotification),
      takeLatest('notification/delete/all', requestDeleteAllNotification),
      takeLatest('notification/read', requestMarkAsReadNotification)
    ]);
  },

  function* fetchTotalRecordWatchers() {
    // fetch /users/me => load total record
    yield all([
      takeLatest(
        'notification/countUnread@internal',
        requestTotalOfUnreadInternal
      ),
      takeLatest('notification/countUnread', requestTotalOfUnread),
      takeLatest('identity/me', requestTotalOfUnread)
    ]);
  }
];
