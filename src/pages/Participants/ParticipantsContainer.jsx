import React, { useState, useEffect } from 'react';
import { Participants } from './Participants';

export const ParticipantsContainer = () => {
  const [participants, setParticipants] = useState([]);
  const [nominations, setNominations] = useState([]);
  const [isLoadedNominations, setIsLoadedNominations] = useState(true);
  const [isLoadedParticipants, setIsLoadedParticipants] = useState(true);
  useEffect(() => {
    fetch('/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nominations')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => b.id - a.id);
        setNominations(data);
        setIsLoadedNominations(false);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetch('/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/participants')
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => a.id - b.id);
        setParticipants(data);
        setIsLoadedParticipants(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Participants
      participants={participants}
      nominations={nominations}
      isLoading={isLoadedNominations || isLoadedParticipants}
    />
  );
};
