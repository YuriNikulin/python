import Cookies from 'js-cookie';
import showNotification from './notification';

export const METHODS = {
  GET: 'GET',
  POST: 'POST',
};

const makeRequest = async (url, params) => {
  const csrfToken = Cookies.get('csrftoken');
  let _resJson;
  return new Promise(async (resolve, reject) => {
    try {
      let _url = url;

      if (params.queryParams) {
        _url = `${url}?${new URLSearchParams(params.queryParams)}`;
      }

      const headers = {
        'X-CSRFToken': csrfToken,
        ...(params.headers || {}),
      };

      const method = params.method || METHODS.GET;
      const body = params.useStringifyBody !== false ? JSON.stringify(params.body || {}) : params.body;

      const res = await fetch(_url, {
        headers,
        body: method !== METHODS.GET ? body : undefined,
        method,
      });
      _resJson = await res.json();

      if (!res.ok) {
        throw new Error(res);
      }

      if (!params.returnRawResponse) {
        return resolve(_resJson);
      }
      return resolve(res);
    } catch (e) {
      if (params.showErrorNotification) {
        showNotification({
          title: 'Ошибка',
          text: params.getErrorNotificationText
            ? params.getErrorNotificationText(_resJson)
            : _resJson.message || '',
        });
      }
      return reject(e);
    }
  });
};

export default makeRequest;
