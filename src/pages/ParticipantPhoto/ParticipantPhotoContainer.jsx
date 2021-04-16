import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantPhoto } from './ParticipantPhoto';
import { useAuthState } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';

export const ParticipantPhotoContainer = () => {
  const { participantId, nominationId } = useParams({});
  const [nominationName, setNominationName] = useState('');
  const [photo, setPhoto] = useState();
  // const [mark, setMark] = useState({});
  const [isLoadingNomination, setIsLoadingNomination] = useState(true);
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(true);
  const [isLoadingMark, setIsLoadingMark] = useState(true);
  const { user, actions } = useAuthState();

  const handleMarkChange = async ({ type, mark }) => {
    const response = await authService.putMark({
      type,
      mark,
      participantId,
      nominationId,
    });
    const marks = response || { idea: 0, look: 0 };
    user.marks[nominationId][participantId] = marks;

    if (marks.look && marks.idea) {
      actions.getNextMark();
    }
  };

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
  }, [participantId, nominationId]);

  return (
    <ParticipantPhoto
      participantId={participantId}
      nominationId={nominationId}
      photo={photo}
      mark={user.marks[nominationId][participantId]}
      nominationName={nominationName}
      isLoading={isLoadingNomination || isLoadingPhoto}
      onMarkChange={handleMarkChange}
    />
  );
};
