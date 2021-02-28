import React from 'react';
import { useParams } from 'react-router-dom';
import { Participant } from './Participant';

export const ParticipantContainer = () => {
  const { id } = useParams();
  return (id && <Participant id={id} />) || null;
};
