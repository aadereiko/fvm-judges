import React, { useCallback, useState, useEffect } from 'react';
import { useAuthState } from '../../../contexts';
import { authService } from '../../../services/auth';
import { managementService } from '../../../services/management';
import { nominationsService } from '../../../services/nominations';
import { participantsService } from '../../../services/participants';
import { Header } from './Header';

export const HeaderContainer = () => {
  const { user, actions } = useAuthState();
  const [notMarked, setNotMarked] = useState([]);

  useEffect(() => {
    fetch(`
      /api/mongo/season/1XAJjK-Ydz23ykAoVW1dEVSSMlHSKXgdk/user/admin/notmarked
    `)
      .then((response) => response.json())
      .then((data) => {
        setNotMarked(data);
      })
      .catch((err) => console.log(err));
  }, []);
  const onLogout = useCallback(() => {
    actions.logout();

    [managementService, nominationsService, participantsService, authService].map(
      (service) => service && service.clean && service.clean(),
    );
  }, [actions]);

  return (
    <Header name={`${user.name}`} notMarked={notMarked} role={user.role} onLogout={onLogout} />
  );
};
