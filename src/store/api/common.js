import { create } from 'apisauce';
import I18n from 'react-native-i18n';
import qs from 'qs';
import config from '../../constant';

export const API = create({ baseURL: config.api, timeout: config.TIMEOUT });

/* eslint-disable */
// urlencode object to string
API.addRequestTransform(request => {
    if (request.method === 'get') {
        if (request.params instanceof Object) {
            if (request.url.indexOf('?') > 0) {
                request.url += '&' + qs.stringify(request.params);
            } else {
                request.url += '?' + qs.stringify(request.params);
            }

            request.params = null;
        }
    }

    // add i18n locale
    // console.log('i18n--', I18n.locale);
    request.headers['x-language'] = I18n.locale;

    return request;
});

// token wrapper
export const withToken = (token, request, ...args) => {
    if (args.length === 1) {  // api.get('/path')
        args.push(null);
        args.push({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return request(...args);
    }

    if (args.length === 2) { // api.get('/path', params)
        args.push({
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return request(...args);
    }

    if (args.length === 3) {
        // overide
        const newArgs = {
            ...args,
            headers: {
                ...args,
                Authorization: `Bearer ${token}`
            }
        };

        return request(...newArgs);
    }

    return request(...args);
};

