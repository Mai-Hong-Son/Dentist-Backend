export const getIdentity = state => state.auth.identity;
export const isLogged = state => state.auth.identity !== null;
