
import { all, takeLatest, select } from 'redux-saga/effects';

import { createRequestSaga } from './common';

import AuthAPI from '../api/auth';
import { updateTokens, removeIdentity } from '../actions/auth';
import { isLogged } from '../selectors/auth';

import IdentityAPI from '../api/identity';
import { updateIdentity, loadIdentity } from '../actions/identity';

const requestLogin = createRequestSaga({
    request: AuthAPI.login,
    success: [
        updateTokens,
        loadIdentity
    ],
    error: [
        removeIdentity
    ],
});

const requestForgotPasswordViaEmail = createRequestSaga({
    request: AuthAPI.forgotPasswordViaEmail,
});

const requestCurrentUser = createRequestSaga({
    request: IdentityAPI.me,
    success: [
        updateIdentity,
    ],
    error: [
        removeIdentity,
    ],
    tokenRequired: true,
});

export default [
    function* authenticateWatcher() {
        yield all([
            takeLatest('auth/login', requestLogin),
            takeLatest('auth/forgotPasswordViaEmail', requestForgotPasswordViaEmail),
        ]);
    },

    function* profileWatcher() {
        yield all([
            takeLatest('identity/me', requestCurrentUser),
        ]);
    },
];
