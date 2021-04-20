import { BasicService } from './BasicService';
import { requestAPI, snackbarHandler } from './request';
class ManagementService extends BasicService {
  constructor() {
    super();
    this._cachedUsers = [];
    this._cachedUser = null;
    this._isCreatingJudge = false;
    this._isRemovingJudge = false;
    this._isLoadingJudge = false;
  }

  async _fetchUsers() {
    const response = await requestAPI(`/users`);

    if (response) {
      if (response.data && response.data.length) {
        this._cachedUsers = response.data;
      }

      return response.data;
    }

    return [];
  }

  async getUsers() {
    if (this._cachedUsers && this._cachedUsers.length) {
      return this._cachedUsers;
    }

    return this._fetchUsers();
  }

  async createJudge({ name, username }) {
    if (!this._isCreatingJudge) {
      this._isCreatingJudge = true;
      const response = await requestAPI('/users', {
        method: 'POST',
        body: {
          name,
          username,
          role: 'judge',
        },
      });

      if (response && response.data) {
        this._cachedUsers.push(response.data);
      }

      snackbarHandler(response, this.snackbarChanger);
      this._isCreatingJudge = false;
    }
  }

  async removeJudge(id) {
    if (!this._isRemovingJudge) {
      this._isRemovingJudge = true;
      const response = await requestAPI(`/users/${id}`, {
        method: 'DELETE',
      });
      if (response && response.data) {
        this._cachedUsers = this._cachedUsers.filter((user) => user._id !== id);
      }
      snackbarHandler(response, this.snackbarChanger);

      this._isRemovingJudge = false;
    }
  }

  async loadUser(id) {
    if (!this._cachedUser || this._cachedUser._id !== id) {
      if (!this._isLoadingJudge) {
        this._isLoadingJudge = true;
        const { data } = await requestAPI(`/users/${id}`);
        this._isLoadingJudge = false;

        if (data) {
          this._cachedUser = data;
        } else {
          return null;
        }
      }
    }
    return this._cachedUser;
  }

  async getMarksOfParticipant(participantId) {
    // not cacheable data
    const response = await requestAPI(`/users/marks?participantId=${participantId}`);

    if (!response || !response.data) {
      return null;
    }

    return response.data;
  }

  clean() {
    this._cachedUsers = [];
    this._cachedUser = null;
    this._isCreatingJudge = false;
    this._isRemovingJudge = false;
    this._isLoadingJudge = false;
  }
}

export const managementService = new ManagementService();
