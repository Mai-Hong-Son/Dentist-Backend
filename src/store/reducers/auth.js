

const initialState = {
    tokens: {
        access_token: null,
        refresh_token: null,
        refreshing: false, // token is refreshing
    },
    isRefreshingToken: false,

    identity: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        
        case 'auth/refreshingToken':
            return {
                ...state,
                isRefreshingToken: true,
            };
        case 'auth/refreshedToken':
            return {
                ...state,
                isRefreshingToken: false,
            };
    

        case 'auth/updateTokens': {
            const { refresh_token, access_token } = action.payload;
            return {
                ...state,
                isRefreshingToken: false,
                tokens: {
                    access_token,
                    refresh_token,
                },
            };
        }
        
        case 'identity/update': {
            return {
                ...state,
                identity: action.payload,
            };
        }

        case 'auth/removeIdentity': {
            return {
                ...state,
                isRefreshingToken: false,
                tokens: {
                    access_token: null,
                    refresh_token: null,
                },
                identity: null,
            };
        }

        default:
            return state;
    }
};

