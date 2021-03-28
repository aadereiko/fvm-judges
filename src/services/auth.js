import { requestAPI, snackbarHandler } from './request';
import { BasicService } from './BasicService';

const TOKEN_KEY = 'FVM_TOKEN';

class AuthService extends BasicService {
  constructor() {
    super();
    this._token = localStorage.getItem(TOKEN_KEY);
    this._currentUser = null;
    this.isLoggedIn = !!this._token;
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
  }

  async getCurrentUser() {
    if (!this._token) {
      console.warn('[Auth Service] User is not logged in');
    }

    const { data: user } = await requestAPI('/users/me');

    if (!user) {
      return null;
    }

    return {
      name: user.name,
      login: user.username,
      role: user.role,
      marks: user.marks,
    };
  }
}

export const authService = new AuthService();
