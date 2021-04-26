import { BasicService } from './BasicService';
import { requestAPI, snackbarHandler } from './request';
const localStoragePhotoKey = 'LAST_MARKED_PHOTO';

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

  getLastMarkedPhoto() {
    const photo = localStorage.getItem(localStoragePhotoKey);
    return photo ? JSON.parse(photo) : null;
  }

  setLastMarkedPhoto(photo) {
    localStorage.setItem(localStoragePhotoKey, JSON.stringify(photo));
  }

  clean() {}
}

export const photoService = new PhotoService();
