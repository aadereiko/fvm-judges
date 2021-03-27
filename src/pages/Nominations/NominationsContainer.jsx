import React, { useState, useEffect } from 'react';
import { nominationsService } from '../../services/nominations';
import { Nominations } from './Nominations';

export const NominationsContainer = () => {
  const [nominations, setNominations] = useState([]);
  const [loadingStatus, setLoadingStatus] = useState(true);

  useEffect(() => {
    const loadNominations = async () => {
      const nominations = await nominationsService.loadNominations();
      setNominations(nominations);
      setLoadingStatus(false);
    };
    loadNominations();
  }, [setNominations, setLoadingStatus]);

  return <Nominations nominations={nominations} isLoading={loadingStatus} />;
};
