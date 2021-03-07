const TOKEN_KEY = 'FVM_TOKEN';

class AuthService {
  constructor() {
    this._token = localStorage.getItem(TOKEN_KEY);
    this._currentUser = null;
    this.isLoggedIn = !!this._token;
  }

  _users = [
    {
      firstName: 'Иван',
      lastName: 'Иванович',
      login: 'user',
    },
  ];

  _setUserToken(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  async login(username) {
    if (username === 'user') {
      this._setUserToken(username);
      this.isLoggedIn = true;
    } else {
      console.warn('[Auth Service] Not valid username');
    }

    return this._users[0];
  }

  logout() {
    this._isLoggedIn = false;
    this._setUserToken(null);
  }

  getCurrentUser() {
    if (!this._token) {
      console.warn('[Auth Service] User is not logged in');
    }

    switch (this._token) {
      case 'user': {
        this._currentUser = this._users[0];

        return this._currentUser;
      }
      default: {
        return null;
      }
    }
  }
}

export const authService = new AuthService();
