import { BasicService } from './BasicService';
import { requestAPI } from './request';

class ParticipantsService extends BasicService {
  constructor() {
    super();
    this._cachedParticipants = [];
    this._isLoadingParticipants = false;
  }

  async loadParticipants() {
    if (!this._cachedParticipants || !this._cachedParticipants.length) {
      const { data } = await requestAPI(`/participants`);

      if (data && data.length) {
        this._cachedParticipants = data.sort((a, b) => a.id - b.id);
      }
    }
    return this._cachedParticipants;
  }

  async loadParticipant(id) {
    const response = await requestAPI(`/participants/custom-id/${id}`);

    if (!response || !response.data) {
      return null;
    }

    return response.data;
  }

  clean() {
    this._cachedParticipants = [];
    this._isLoadingParticipants = false;
  }
}

export const participantsService = new ParticipantsService();
