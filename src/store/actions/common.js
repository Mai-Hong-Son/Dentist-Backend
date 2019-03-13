/**
 * I18N
 */
export const changeLanguage = payload => ({
  type: 'app/changeLanguage',
  payload
});

/**
 * Theme
 */
export const changeTheme = payload => ({
  type: 'app/changeTheme',
  payload
});

export const applyThemeFunction = payload => ({
  type: 'app/applyThemeFunction',
  payload
});

/**
 * REQUEST
 */
export const markRequestPending = key => ({
  type: 'request/pending',
  meta: { key }
});

export const markRequestSuccess = key => ({
  type: 'request/success',
  meta: { key }
});

export const markRequestCancelled = ({ type, reason }, key) => ({
  type: 'request/cancelled',
  payload: `${type}: ${reason || 'called'}`,
  meta: { key }
});

export const markRequestFailed = (reason, key) => ({
  type: 'request/failed',
  payload: reason,
  meta: { key }
});

export const invokeCallback = (callback, ...args) => ({
  type: 'callback/invoke',
  payload: callback && callback.call(null, ...args)
});


// Navigator
export const navChanged = screen => ({ type: 'nav/changed', payload: screen });
