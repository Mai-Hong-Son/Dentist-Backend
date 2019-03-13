export const login = ({ username, password }, ...etc) => ({
  type: 'auth/login',
  args: [
    {
      username,
      password
    },
    ...etc
  ]
});

export const forgotPasswordViaEmail = ({ email }) => ({
  type: 'auth/forgotPasswordViaEmail',
  args: [{ email }]
});

export const changePassword = (token, { old_password, new_password }) => ({
  type: 'auth/changePassword',
  args: [
    token,
    {
      old_password,
      new_password
    }
  ]
});

// TOKEN

export const logout = () => ({
  type: 'auth/logout'
});

export const refreshToken = ({ refresh_token }) => ({
  type: 'auth/refreshAccessToken',
  args: [{ refresh_token }]
});

export const removeIdentity = () => ({
  type: 'auth/removeIdentity'
});

export const updateTokens = ({ access_token, refresh_token }) => ({
  type: 'auth/updateTokens',
  payload: {
    access_token,
    refresh_token
  }
});

export const refreshingToken = () => ({
  type: 'auth/refreshingToken'
});

export const refreshedToken = () => ({
  type: 'auth/refreshedToken'
});
