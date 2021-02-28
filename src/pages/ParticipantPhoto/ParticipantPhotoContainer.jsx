import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NOMINATIONS } from '../../mock';
import { PARTICIPANTS } from '../../mock/participants';
import { ParticipantPhoto } from './ParticipantPhoto';

export const ParticipantPhotoContainer = () => {
  const { participantId, nominationId } = useParams();
  const nominationName = useMemo(
    () => (NOMINATIONS[nominationId - 1] && NOMINATIONS[nominationId - 1].name) || '',
    [nominationId],
  );
  const photo = useMemo(() => {
    return (
      (PARTICIPANTS[participantId] &&
        PARTICIPANTS[participantId].nominations &&
        PARTICIPANTS[participantId].nominations[nominationId]) ||
      null
    );
  }, [nominationId, participantId]);

  return (
    <ParticipantPhoto
      participantId={participantId}
      nominationId={nominationId}
      photo={photo}
      nominationName={nominationName}
    />
  );
};
