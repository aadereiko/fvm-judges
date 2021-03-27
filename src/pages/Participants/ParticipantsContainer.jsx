import React, { useState, useEffect } from 'react';
import { useAuthState } from '../../contexts';
import { nominationsService } from '../../services/nominations';
import { participantsService } from '../../services/participants';
import { Participants } from './Participants';

export const ParticipantsContainer = () => {
  const [participants, setParticipants] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [isLoadedNominations, setIsLoadedNominations] = useState(true);
  const [isLoadedParticipants, setIsLoadedParticipants] = useState(true);
  const { user } = useAuthState();

  useEffect(() => {
    const loadNominations = async () => {
      const nominations = await nominationsService.loadNominations();
      setNominations(nominations);
      setIsLoadedNominations(false);
    };
    loadNominations();
  }, [setIsLoadedNominations, setIsLoadedNominations]);

  useEffect(() => {
    const loadParticipants = async () => {
      const participants = await participantsService.loadParticipants();
      setParticipants(participants);
      setIsLoadedParticipants(false);
    };
    loadParticipants();
  }, [setParticipants, setIsLoadedParticipants]);

  return (
    <>
      <Participants
        participants={participants}
        nominations={nominations}
        isLoading={isLoadedNominations || isLoadedParticipants}
        marks={user.marks || {}}
      />
    </>
  );
};
