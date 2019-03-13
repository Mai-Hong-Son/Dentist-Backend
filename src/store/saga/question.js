import { takeEvery, takeLatest, select, all, put } from 'redux-saga/effects';
import { createRequestSaga } from './common';
import API from '../api/question';
import { invokeCallback } from '../actions/common';
import { t } from '../../utils/common';

const requestDetailOfQuestion = createRequestSaga({
  cancel: 'auth/removeIdentity',
  request: API.detail,
  tokenRequired: true
});

const requestQuestions = createRequestSaga({
  cancel: 'auth/removeIdentity',
  request: API.all,
  tokenRequired: true
});

function* requestListOfStatus(action) {
  // loaded ?
  const statuses = [
    {
      id: -1,
      title: t('questions.status.all')
    },
    {
      id: 1,
      title: t('questions.status.answered')
    },
    {
      id: 0,
      title: t('questions.status.pending')
    },
    {
      id: 3,
      title: t('questions.status.expired')
    }
  ];

  const { args } = action;
  const callback = args[args.length - 1];

  yield put(
    invokeCallback(callback, null, {
      total: statuses.length,
      items: statuses
    })
  );
}

const requestAnswerByQuestion = createRequestSaga({
  request: API.answerByQuestion,
  tokenRequired: true,
  cancel: 'auth/removeIdentity'
});

export default [
  function* fetchQuestionWatchers() {
    yield all([
      takeEvery('question/detail', requestDetailOfQuestion),
      takeEvery('question/all', requestQuestions),
      takeEvery('answer/by_question', requestAnswerByQuestion)
    ]);
  },

  function* fetchListOfStatusWatchers() {
    yield all([takeEvery('question/status', requestListOfStatus)]);
  }
];
