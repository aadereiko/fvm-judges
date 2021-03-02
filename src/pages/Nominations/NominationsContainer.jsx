import React, { useState, useEffect } from 'react';
import { NOMINATIONS } from '../../mock';
import { Nominations } from './Nominations';

export const NominationsContainer = () => {
  const [nominations, setNominations] = useState([]);
  const [photo, setphoto] = useState('');
  useEffect(() => {
    fetch('/api/google/nominations')
      .then((response) => response.json())
      .then((data) => {
        setNominations(data.nominations);
      })
      .catch((err) => console.log(err));
  }, []);

  return <Nominations nominations={nominations} />;
};
