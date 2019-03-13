import qs from 'qs';
import { API, withToken } from './common';

export default {
  resultTemplate: (token, { service_id }) =>
    withToken(
      token,
      API.get,
      `/manages/consultings/relations?${qs.stringify({
        filters: {
          service_id
        }
      })}`
    ),
  submission: (token, data) =>
    withToken(token, API.post, '/manages/answers', data)
};
