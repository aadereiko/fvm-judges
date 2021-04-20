import React, { useEffect, useState } from 'react';
import { authService } from '../../services/auth';
import { nominationsService } from '../../services/nominations';
import { participantsService } from '../../services/participants';
import { ManagementParticipants } from './ManagementParticipants';

export const ManagementParticipantsContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [marks, setMarks] = useState(null);
  const [nominations, setNominations] = useState([]);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const loadMarks = async () => {
      setIsLoading(true);
      const loadedMarks = await authService.getMarkSums();
      setMarks(loadedMarks);
      setIsLoading(false);
    };

    loadMarks();
  }, [setMarks, setIsLoading]);

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
    <ManagementParticipants
      marks={marks}
      isLoading={isLoading}
      nominations={nominations}
      participants={participants}
    />
  );
};
