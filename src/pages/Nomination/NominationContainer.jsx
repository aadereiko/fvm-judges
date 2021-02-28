import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { NOMINATIONS } from '../../mock';
import { PARTICIPANTS } from '../../mock/participants';
import { Nomination } from './Nomination';

export const NominationContainer = () => {
  const { id } = useParams();
  const nomination = useMemo(() => NOMINATIONS[id - 1], [id]);
  const photos = useMemo(
    () =>
      PARTICIPANTS.map((participant) => ({
        ...participant.nominations[id],
        participantId: participant.id,
      })),
    [id],
  );
  return <Nomination name={nomination.name} id={nomination.id} photos={photos} />;
};
