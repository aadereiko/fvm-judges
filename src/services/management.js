import { requestAPI } from './request';

class ManagementService {
  constructor() {
    this._cachedUsers = [];
    this._isCreatingJudge = false;
    this._isRemovingJudge = false;
  }

  async _fetchUsers() {
    const { data } = await requestAPI(`/users`);

    if (data && data.length) {
      this._cachedUsers = data;
    }

    return data;
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
      const { data } = await requestAPI('/users', {
        method: 'POST',
        body: {
          name,
          username,
          role: 'judge',
        },
      });

      if (data) {
        this._cachedUsers.push(data);
      }
      this._isCreatingJudge = false;
    }
  }

  async removeJudge(id) {
    if (!this._isRemovingJudge) {
      this._isRemovingJudge = true;
      const { data } = await requestAPI(`/users/${id}`, {
        method: 'DELETE',
      });
      if (data) {
        this._cachedUsers = this._cachedUsers.filter((user) => user._id !== id);
      }
      this._isRemovingJudge = false;
    }
  }
}

export const managementService = new ManagementService();
