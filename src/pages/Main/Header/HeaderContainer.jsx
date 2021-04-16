import React, { useCallback, useState, useEffect } from 'react';
import { useAuthState } from '../../../contexts';
import { authService } from '../../../services/auth';
import { managementService } from '../../../services/management';
import { nominationsService } from '../../../services/nominations';
import { participantsService } from '../../../services/participants';
import { Header } from './Header';

export const HeaderContainer = () => {
  const { user, actions, nextMark } = useAuthState();

  useEffect(() => {
    actions.getNextMark();
  }, []);

  const onLogout = useCallback(() => {
    actions.logout();

    [managementService, nominationsService, participantsService, authService].map(
      (service) => service && service.clean && service.clean(),
    );
  }, [actions]);

  return <Header name={`${user.name}`} role={user.role} onLogout={onLogout} nextMark={nextMark} />;
};
