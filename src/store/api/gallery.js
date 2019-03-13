import qs from 'qs';
import { API, withToken } from './common';

export default {
  all: (token, criterial) =>
    withToken(token, API.get, `manages/gallery?${qs.stringify(criterial)}`),
  detail: (token, id) => withToken(token, API.get, `manages/gallery/${id}`)
};
