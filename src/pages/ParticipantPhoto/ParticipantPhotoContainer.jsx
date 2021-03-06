import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantPhoto } from './ParticipantPhoto';

export const ParticipantPhotoContainer = () => {
  const { participantId, nominationId } = useParams({});
  const [nominationName, setNominationName] = useState('');
  const [photo, setPhoto] = useState();

  useEffect(() => {
    fetch(`
      /api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nomination/${nominationId}/participant/${participantId}
    `)
      .then((response) => response.json())
      .then(({ name, link }) => {
        setPhoto({ name, link });
      })
      .catch((err) => console.log(err));
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nomination/${nominationId}`)
      .then((response) => response.json())
      .then(({ name }) => {
        setNominationName(name);
      })
      .catch((err) => console.log(err));
  }, []);

  // const nominationName = useMemo(
  //   () => (NOMINATIONS[nominationId - 1] && NOMINATIONS[nominationId - 1].name) || '',
  //   [nominationId],
  // );
  // const photo = useMemo(() => {
  //   return (
  //     (PARTICIPANTS[participantId] &&
  //       PARTICIPANTS[participantId].nominations &&
  //       PARTICIPANTS[participantId].nominations[nominationId]) ||
  //     null
  //   );
  // }, [nominationId, participantId]);

  return (
    <ParticipantPhoto
      participantId={participantId}
      nominationId={nominationId}
      photo={photo}
      nominationName={nominationName}
    />
  );
};
