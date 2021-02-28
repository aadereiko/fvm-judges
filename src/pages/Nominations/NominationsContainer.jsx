import React, { useMemo } from 'react';
import { NOMINATIONS } from '../../mock';
import { Nominations } from './Nominations';

export const NominationsContainer = () => {
  const nominations = useMemo(() => NOMINATIONS, []);
  return <Nominations nominations={nominations} />;
};
