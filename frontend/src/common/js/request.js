import Cookies from 'js-cookie';
import showNotification from './notification';

export const METHODS = {
    GET: 'GET',
    POST: 'POST',
};

const makeRequest = async (url, params) => {
    const csrfToken = Cookies.get('csrftoken');
    let response;
    let abortController
    if (params.expiresAfter) {
        abortController = new AbortController()
        setTimeout(() => {
            if (!response) {
                abortController.abort()
                if (params.expirationMessage) {
                    showNotification(params.expirationMessage);
                }
            }
        }, params.expiresAfter)
    }

    return new Promise(async (resolve, reject) => {
        try {
            let _url = url;

            if (params.queryParams) {
                _url = `${url}?${new URLSearchParams(params.queryParams)}`;
            }

            const headers = {
                'X-CSRFToken': csrfToken,
                ...(params.headers || {}),
            }

            if (params.shouldSetContentType !== false) {
                headers['Content-Type'] = 'application/json'
            }

            const method = params.method || METHODS.GET;
            const body = params.useStringifyBody !== false ? JSON.stringify(params.body || {}) : params.body;

            const res = await fetch(_url, {
                headers,
                body: method !== METHODS.GET ? body : undefined,
                method,
                signal: abortController?.signal
            });
            if (!params.returnRawResponse) {
                response = await res.json();
            } else {
                response = res
            }

            if (!res.ok) {
                throw new Error(res);
            }

            if (!params.returnRawResponse) {
                return resolve(response);
            }
            return resolve(res);
        } catch (e) {
            if (params.showErrorNotification) {
                showNotification({
                    title: 'Ошибка',
                    text: params.getErrorNotificationText
                        ? params.getErrorNotificationText(response)
                        : response?.message || '',
                });
            }
            return reject(e);
        }
    });
};

export default makeRequest;
