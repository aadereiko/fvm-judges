import React, { useCallback } from 'react';
import { useAuthState } from '../../contexts';
import { Login } from './Login';

export const LoginContainer = () => {
  const { actions } = useAuthState();

  const handleClick = useCallback(
    ({ username }) => {
      actions.login(username);
    },
    [actions],
  );
  return <Login onClick={handleClick} />;
};
