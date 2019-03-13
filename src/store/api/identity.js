import { API } from './common';


export default {
    me: (token) => API.get('/manages/auth/me', {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
};
