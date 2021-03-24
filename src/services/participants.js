import { requestAPI } from './request';

class ParticipantsService {
  constructor() {
    this._cachedParticipants = [];
    this._isLoadingParticipants = false;
  }

  async loadParticipants() {
    if (!this._cachedParticipants || !this._cachedParticipants.length) {
      const { data } = await requestAPI(`/participants`);

      if (data && data.length) {
        this._cachedParticipants = data;
      }
    }
    return this._cachedParticipants;
  }

  clean() {
    this._cachedParticipants = [];
    this._isLoadingParticipants = false;
  }
}

export const participantsService = new ParticipantsService();
