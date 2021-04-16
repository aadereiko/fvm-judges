import { requestAPI } from './request';

class NominationsService {
  constructor() {
    this._cachedNominations = [];
    this._isLoadingNominations = false;
  }

  async loadNominations() {
    if (!this._cachedNominations || !this._cachedNominations.length) {
      const response = await requestAPI(`/nominations`);

      if (response && response.data && response.data.length) {
        this._cachedNominations = response.data.sort((a, b) => b.id - a.id);
      }
    }
    return this._cachedNominations;
  }

  clean() {
    this._cachedNominations = [];
    this._isLoadingNominations = false;
  }
}

export const nominationsService = new NominationsService();
