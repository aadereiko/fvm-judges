import React, { useCallback, useState, useEffect } from 'react';
import { useAuthState } from '../../../contexts';
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
  }, [actions]);

  return <Header name={`${user.name}`} notMarked={notMarked} onLogout={onLogout} />;
};
