import qs from 'qs';
import { API, withToken } from './common';

export default {
  firstAnswer: async (token, { question_id }) => {
    const response = await withToken(
      token,
      API.get,
      `/manages/answers?${qs.stringify({
        filters: {
          question_id
        }
      })}`
    );

    if (response.data.total) {
      response.data = response.data.items[0]; // replace first
    }

    return response;
  }
};
