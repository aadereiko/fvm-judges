import { authService } from './auth';

export const requestAPI = async (url, { body, ...options } = {}) => {
  const host = '/api';
  const headers = new Headers(options.headers);
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${authService.getCurrentToken()}`);

  const fetchOptions = {
    // mode: 'cors',
    headers,
    body: body ? JSON.stringify(body) : null,
    ...options,
  };

  return fetch(host + url, fetchOptions)
    .then((response) => response.json())
    .then((response) => response)
    .catch((err) => {
      console.error(err);
    });
};

export const snackbarHandler = (response, snackbarChanger) => {
  if (response) {
    const text = response.err || response.msg;
    if (text) {
      snackbarChanger({
        isShown: true,
        text,
      });
    }
  }
};
