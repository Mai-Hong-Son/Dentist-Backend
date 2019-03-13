import { API } from './common';
import { getDevice } from '../../utils/onesignal';

export default {
  login: ({ username, password }) =>
    API.post(
      'manages/auth/basic',
      {
        username,
        password
      },
      {
        headers: {
          'x-device-id': getDevice()
        }
      }
    ),

  changePassword: (token, { new_password, old_password }) =>
    API.post(
      'manages/auth/change-password',
      {
        new_password,
        old_password
      },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ),

  logout: ({ refresh_token }) =>
    API.put(
      'manages/auth/logout',
      {
        refresh_token
      },
      {
        headers: {
          'x-device-id': getDevice()
        }
      }
    ),

  refreshAccessToken: ({ refresh_token }) =>
    API.post(
      'manages/auth/refresh',
      {
        refresh_token
      },
      {
        headers: {
          'x-device-id': getDevice()
        }
      }
    ),

  forgotPasswordViaEmail: ({ email }) =>
    API.post('manages/auth/forgot-password', { email })
};
