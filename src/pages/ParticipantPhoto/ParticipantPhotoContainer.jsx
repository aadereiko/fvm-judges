import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantPhoto } from './ParticipantPhoto';

export const ParticipantPhotoContainer = () => {
  const { participantId, nominationId } = useParams({});
  const [nominationName, setNominationName] = useState('');
  const [photo, setPhoto] = useState();
  const [mark, setMark] = useState({});
  const [isLoadingNomination, setIsLoadingNomination] = useState(true);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const [isLoadingMark, setIsLoadingMark] = useState(true);

  useEffect(() => {
    fetch(`
      /api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nomination/${nominationId}/participant/${participantId}
    `)
      .then((response) => response.json())
      .then(({ name, link, id }) => {
        setPhoto({ name, link, id });
        setIsLoadingPhoto(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingPhoto(false);
      });
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nomination/${nominationId}`)
      .then((response) => response.json())
      .then(({ name }) => {
        setNominationName(name);
        setIsLoadingNomination(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingNomination(false);
      });
    fetch(`
      /api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/user/admin/${nominationId}/${participantId}
    `)
      .then((response) => response.json())
      .then((mark) => {
        setMark(mark);
        setIsLoadingMark(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingMark(false);
      });
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
      mark={mark}
      nominationName={nominationName}
      isLoading={isLoadingMark || isLoadingNomination || isLoadingPhoto}
    />
  );
};
