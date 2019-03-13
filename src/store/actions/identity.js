

export const updateIdentity = (payload) => ({
    type: 'identity/update',
    payload,
});

export const loadIdentity = (...etc) => ({
    type: 'identity/me',
    args: [
        ...etc
    ]
});
