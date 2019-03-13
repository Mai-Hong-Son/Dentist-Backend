import qs from 'qs';
import { API, withToken } from './common';

export default {
  all: (token, criterial) => {
    const filters = criterial.filters;
    if (filters.status === -1) {
      delete filters.status;
    }

    if (filters.service_id === 0) {
      delete filters.service_id;
    }

    return withToken(token, API.get, '/manages/questions', {
      ...criterial,
      filters
    });
  },
  detail: async (token, id) => {
    const questionResponse = await withToken(
      token,
      API.get,
      `/manages/questions/${id}`
    );

    if (questionResponse.data) {
      if (questionResponse.data.status) {
        // has question
        const answerResponse = await withToken(
          token,
          API.get,
          `/manages/answers?${qs.stringify({
            filters: {
              question_id: questionResponse.data.id
            },
            limit: 1
          })}`
        );

        questionResponse.data.answer_of_advisor = null;
        if (answerResponse.data) {
          if (answerResponse.data.items[0]) {
            questionResponse.data.answer_of_advisor =
              answerResponse.data.items[0];
          }
        }
      } else {
        // auto
        // has question
        const autoResponse = await withToken(
          token,
          API.get,
          `/manages/service-issue-details/${
            questionResponse.data.service_issue_detail_id
          }`
        );

        questionResponse.data.auto_answer = null;
        if (autoResponse.data) {
          questionResponse.data.auto_answer = autoResponse.data;
        }
      }
    }

    return questionResponse;
  }
};
