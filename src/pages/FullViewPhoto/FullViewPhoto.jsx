import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { FullViewPhotoWrapperElement, OverlayElement } from './elements';

export const FullViewPhoto = () => {
  const { participantId, nominationId, imgUrl } = useParams({});

  return (
    <FullViewPhotoWrapperElement>
      <OverlayElement>
        <img src={`https://drive.google.com/uc?id=${imgUrl}`} />

        <Link to={`/photos/${nominationId}/${participantId}`}>
          <span>Перейти к оцениванию</span>
        </Link>
      </OverlayElement>

      {participantId + nominationId}
    </FullViewPhotoWrapperElement>
  );
};
