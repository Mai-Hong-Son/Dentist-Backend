import { API, withToken } from './common';

export default {
  all: (token, criterial = {}) =>
    withToken(token, API.get, '/manages/services', criterial),

  issueDetail: (token, { id }) =>
    withToken(token, API.get, `/manages/service-issue-details/${id}`)
};
