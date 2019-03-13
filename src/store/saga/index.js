import { fork, all } from 'redux-saga/effects';

import token from './token';
import auth from './auth';
import screen from './screen';
import question from './question';
import service from './service';
import advisory from './advisory';
import gallery from './gallery';
import notification from './notification';

const rootSaga = function* () {
  yield all([
    ...token.map(watcher => fork(watcher)),
    ...auth.map(watcher => fork(watcher)),
    ...screen.map(watcher => fork(watcher)),
    ...question.map(watcher => fork(watcher)),

    ...service.map(watcher => fork(watcher)),
    ...advisory.map(watcher => fork(watcher)),
    ...gallery.map(watcher => fork(watcher)),
    ...notification.map(watcher => fork(watcher)),
  ]);
};

export default rootSaga;
