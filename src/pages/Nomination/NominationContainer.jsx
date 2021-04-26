import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthState } from '../../contexts';
import { nominationsService } from '../../services/nominations';
import { Nomination } from './Nomination';

export const NominationContainer = () => {
  const { user } = useAuthState();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [photos, setPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const isAdmin = user.role === 'admin';

  useEffect(() => {
    const fetchNomination = async () => {
      const nomination = await nominationsService.loadNomination(id);
      setName(nomination.name);
      setPhotos(nomination.photos);
      setIsLoading(false);
    };
    fetchNomination();
  }, [setIsLoading]);

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
