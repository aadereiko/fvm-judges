import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { Nomination } from './Nomination';

export const NominationContainer = () => {
  const { user } = useAuthState();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    fetch(`/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nomination/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setPhotos(data.photos);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [setIsLoading]);

  // const nomination = useMemo(() => NOMINATIONS[id - 1], [id]);
  // const photos = useMemo(
  //   () =>
  //     PARTICIPANTS.map((participant) => ({
  //       ...participant.nominations[id],
  //       participantId: participant.id,
  //     })),
  //   [id],
  // );
  return (
    <Nomination
      name={name}
      id={id}
      photos={photos}
      isLoading={isLoading}
      marks={user.marks}
      withoutMarks={isAdmin}
      isAdmin={isAdmin}
    />
  );
};
