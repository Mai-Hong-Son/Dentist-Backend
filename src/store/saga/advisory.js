import { takeEvery, put, all } from 'redux-saga/effects';
import { invokeCallback } from '../actions/common';
import { createRequestSaga } from './common';

import API from '../api/advisory';

// function* requestAdvisoryTemplate(action) {
//   const { args } = action;

//   const callback = args[args.length - 1];

//   // flex result
//   // GET /advisories?field[]=list_of_results&field[]=list_of_times, ...
//   // &service_id ...

//   const result = {
//     result: {
//       title: 'Kết quả',
//       sub_title: 'Độ hô của bạn',
//       items: [
//         {
//           id: 1,
//           title: 'Sẽ được cải thiện đáng kể'
//         },
//         {
//           id: 2,
//           title: 'Không đổi'
//         }
//       ]
//     },

//     time: {
//       title: 'Thời gian dự kiến',
//       items: [
//         {
//           id: 1,
//           title: '< 1 năm'
//         },
//         {
//           id: 2,
//           title: '1-2 năm'
//         },
//         {
//           id: 3,
//           title: '2-3 năm'
//         }
//       ]
//     },

//     method: {
//       title: 'Thủ thuât',
//       items: [
//         {
//           id: 1,
//           title: 'Phẫu thuật'
//         },
//         {
//           id: 2,
//           title: 'Niềng răng'
//         },
//         {
//           id: 3,
//           title: 'Bắt vít'
//         }
//       ]
//     },

//     difficulty: {
//       title: 'Độ khó',
//       items: [
//         {
//           id: 1,
//           title: '1'
//         }
//       ]
//     }
//   };

//   console.log('invoke!');
//   yield put(invokeCallback(callback, null, result));
// }

const requestAdvisoryTemplate = createRequestSaga({
  request: API.resultTemplate,
  cancel: 'auth/removeIdentity',
  tokenRequired: true
});

const requestAdvisorySubmission = createRequestSaga({
  request: API.submission,
  cancel: 'auth/removeIdentity',
  tokenRequired: true
});

export default [
  function* advisoryWatchers() {
    yield all([
      takeEvery('advisory/result_template', requestAdvisoryTemplate),
      takeEvery('advisory/submit', requestAdvisorySubmission)
    ]);
  }
];
