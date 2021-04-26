import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { ParticipantPhoto } from './ParticipantPhoto';
import { useAuthState } from '../../contexts/AuthContext';
import { authService } from '../../services/auth';
import { photoService } from '../../services/photo';

export const ParticipantPhotoContainer = () => {
  const { participantId, nominationId } = useParams({});
  const [nominationName, setNominationName] = useState('');
  const [photo, setPhoto] = useState();
  // const [mark, setMark] = useState({});
  const [isLoading, setIsLoading] = useState(true);
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
    const loadPhoto = async () => {
      const loadedPhoto = await photoService.loadPhoto({
        nominationId,
        participantId,
      });
      if (loadedPhoto) {
        setPhoto(loadedPhoto.photo);
        setNominationName(loadedPhoto.nomination.name);
        setIsLoading(false);
      }
    };
    loadPhoto();
  }, [participantId, nominationId, setIsLoading, setNominationName, setPhoto]);

  return (
    <ParticipantPhoto
      participantId={participantId}
      nominationId={nominationId}
      photo={photo}
      mark={user.marks[nominationId][participantId]}
      nominationName={nominationName}
      isLoading={isLoading}
      onMarkChange={handleMarkChange}
    />
  );
};
