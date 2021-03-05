import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Participant } from './Participant';

export const ParticipantContainer = () => {
  const { id } = useParams();
  const [participant, setParticipant] = useState();

  useEffect(() => {
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/participant/${id}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setParticipant(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (participant && <Participant id={id} participant={participant} />) || null;
};
