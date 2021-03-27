import { requestAPI } from './request';

class NominationsService {
  constructor() {
    this._cachedNominations = [];
    this._isLoadingNominations = false;
  }

  async loadNominations() {
    if (!this._cachedNominations || !this._cachedNominations.length) {
      const { data } = await requestAPI(`/nominations`);

      if (data && data.length) {
        this._cachedNominations = data.sort((a, b) => b.id - a.id);
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
