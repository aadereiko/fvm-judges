import React, { useState, useEffect } from 'react';
import { NOMINATIONS } from '../../mock';
import { Nominations } from './Nominations';

export const NominationsContainer = () => {
  const [nominations, setNominations] = useState([]);
  useEffect(() => {
    fetch('/api/google/nominations')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setNominations(data.nominations);
      })
      .catch((err) => console.log(err));
  }, []);

  return <Nominations nominations={nominations} />;
};
