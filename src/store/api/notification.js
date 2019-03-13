import qs from 'qs';
import { API, withToken } from './common';

export default {
  fetchNotifications: (token, criterial) =>
    withToken(
      token,
      API.get,
      `/manages/notification-users?${qs.stringify(criterial)}`
    ),

  deleteNotifications: (token, { id }) =>
    withToken(token, API.delete, `/manages/notification-users/${id}`),

  deleteAllNotification: token =>
    withToken(token, API.delete, '/manages/notification-users/all'),

  markAsReadNotification: (token, { id }) =>
    withToken(token, API.patch, `/manages/notification-users/${id}`, {
      status: 3
    })
};
