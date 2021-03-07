import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Participant } from './Participant';

export const ParticipantContainer = () => {
  const { id } = useParams();
  const [participant, setParticipant] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/participant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setParticipant(data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setIsLoading]);

  return (
    (participant && <Participant id={id} participant={participant} isLoading={isLoading} />) || null
  );
};
