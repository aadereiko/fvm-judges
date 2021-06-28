import { requestAPI, snackbarHandler } from './request';
import { BasicService } from './BasicService';

const TOKEN_KEY = 'FVM_TOKEN';

class AuthService extends BasicService {
  constructor() {
    super();
    this._token = localStorage.getItem(TOKEN_KEY);
    this._currentUser = null;
    this.isLoggedIn = !!this._token;
    this._nextMark = null;
    this._markSums = null;
  }

  _setUserToken(token) {
    this._token = token;
    localStorage.setItem(TOKEN_KEY, token);
  }

  async login(username) {
    const response = await requestAPI('/users/auth', {
      method: 'POST',
      body: {
        username,
      },
    });

    if (response && response.data) {
      this._setUserToken(response.data.token);
      this._currentUser = response.data.user;
    }

    snackbarHandler(response, this.snackbarChanger);

    if (response && response.data) {
      return response.data.user;
    }

    console.warn('[Auth Service] Not valid username');
    return null;
  }

  logout() {
    this._isLoggedIn = false;
    this._setUserToken(null);
  }

  getCurrentToken() {
    return this._token;
  }

  clean() {
    this._currentUser = null;
    this._token = null;
    this._nextMark = null;
  }

  async getCurrentUser() {
    if (!this._token) {
      console.warn('[Auth Service] User is not logged in');
    }

    const response = await requestAPI('/users/me');

    if (!response || !response.data) {
      return null;
    }

    const user = response.data;

    return {
      name: user.name,
      login: user.username,
      role: user.role,
      marks: user.marks,
    };
  }

  async getNextMark() {
    const response = await requestAPI('/users/notMarked');

    if (response && response.data) {
      this._nextMark = response.data;
    }

    return this._nextMark;
  }

  async getNextNominationMark(nomId) {
    const response = await requestAPI(`/users/notMarked/${nomId}`);

    if (response && response.data) {
      this._nextMark = response.data;
    }

    return this._nextMark;
  }

  async putMark({ type, mark, nominationId, participantId }) {
    const response = await requestAPI(`/user/${nominationId}/${participantId}`, {
      method: 'PUT',
      body: {
        type: type,
        mark: mark,
      },
    });

    snackbarHandler(response, this.snackbarChanger);

    return response.data;
  }

  async getMarkSums() {
    const response = await requestAPI('/users/marks/sum');

    if (response && response.data) {
      this._markSums = response.data;
    }

    snackbarHandler(response, this.snackbarChanger);

    return this._markSums;
  }
}

export const authService = new AuthService();
