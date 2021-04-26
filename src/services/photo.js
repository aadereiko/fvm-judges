import { BasicService } from './BasicService';
import { requestAPI, snackbarHandler } from './request';

class PhotoService extends BasicService {
  constructor() {
    super();
  }

  async loadPhoto({ participantId, nominationId }) {
    const response = await requestAPI(
      `/photos/custom-id?participantId=${participantId}&nominationId=${nominationId}`,
    );

    if (!response || !response.data) {
      return null;
    }

    return response.data;
  }

  clean() {}
}

export const photoService = new PhotoService();
