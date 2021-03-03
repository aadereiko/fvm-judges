import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { NOMINATIONS } from '../../mock';
import { PARTICIPANTS } from '../../mock/participants';
import { Nomination } from './Nomination';

export const NominationContainer = () => {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  useEffect(() => {
    fetch(`/api/google/nomination/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setPhotos(data.photosId);
      })
      .catch((err) => console.log(err));
  }, []);

  // const nomination = useMemo(() => NOMINATIONS[id - 1], [id]);
  // const photos = useMemo(
  //   () =>
  //     PARTICIPANTS.map((participant) => ({
  //       ...participant.nominations[id],
  //       participantId: participant.id,
  //     })),
  //   [id],
  // );
  return <Nomination name={name} id={id} photos={photos} />;
};
