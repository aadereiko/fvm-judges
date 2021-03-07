import React, { useCallback } from 'react';
import { useAuthState } from '../../../contexts';
import { Header } from './Header';

export const HeaderContainer = () => {
  const { user, actions } = useAuthState();

  const onLogout = useCallback(() => {
    actions.logout();
  }, [actions]);

  return <Header name={`${user.lastName} ${user.firstName}`} onLogout={onLogout} />;
};
