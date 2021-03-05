import React, { useState, useEffect } from 'react';
import { NOMINATIONS } from '../../mock';
import { Nominations } from './Nominations';

export const NominationsContainer = () => {
  const [nominations, setNominations] = useState([]);
  const [photo, setphoto] = useState('');
  useEffect(() => {
    fetch('/api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/nominations')
      .then((response) => response.json())
      .then((data) => {
        setNominations(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return <Nominations nominations={nominations} />;
};
