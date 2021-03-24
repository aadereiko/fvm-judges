import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { managementService } from '../../services/management';
import { nominationsService } from '../../services/nominations';
import { participantsService } from '../../services/participants';
import { JudgeProfile } from './JudgeProfile';

export const JudgeProfileContainer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState({});
  const [nominations, setNominations] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      const user = await managementService.loadUser(id);
      setUser(user);
      setIsLoading(false);
    };
    loadUser();
  }, [setIsLoading, setUser]);

  useEffect(() => {
    const loadNominations = async () => {
      const nominations = await nominationsService.loadNominations();
      setNominations(nominations);
    };
    loadNominations();
  }, [setNominations]);

  useEffect(() => {
    const loadParticipants = async () => {
      const participants = await participantsService.loadParticipants();
      setParticipants(participants);
    };
    loadParticipants();
  }, [setParticipants]);

  return (
    user && (
      <JudgeProfile
        isLoading={isLoading}
        name={user.name || ''}
        username={user.username || ''}
        marks={user.marks || {}}
        nominations={nominations}
        participants={participants}
      />
    )
  );
};
