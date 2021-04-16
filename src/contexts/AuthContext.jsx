import React, { useCallback } from 'react';
import { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { authService } from '../services/auth';

export const AuthContext = createContext();

const authDataDefault = {
  user: null,
  // null is not checked, false - not auth, true - auth
  isLoggedIn: null,
  status: 'pending',
  nextMark: null,
  actions: {
    login: () => {},
    logout: () => {},
    getNextMark: () => {},
  },
};

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(authDataDefault);

  // actions
  const login = useCallback(
    async (username) => {
      const user = await authService.login(username);
      if (user) {
        setAuthData((state) => ({
          ...state,
          status: 'success',
          user,
          error: 'null',
          isLoggedIn: true,
        }));
      }
    },
    [setAuthData],
  );

  const logout = useCallback(() => {
    authService.logout();
    setAuthData((state) => ({
      ...state,
      user: null,
      isLoggedIn: false,
    }));
  }, [setAuthData]);

  const getNextMark = useCallback(async () => {
    const mark = await authService.getNextMark();
    if (mark) {
      setAuthData((state) => ({
        ...state,
        nextMark: mark,
      }));
    }
  }, [setAuthData]);

  useEffect(() => {
    const actions = {};
    actions.login = login;
    actions.logout = logout;
    actions.getNextMark = getNextMark;

    const fetchData = async () => {
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setAuthData((state) => ({
          ...state,
          status: 'success',
          user: currentUser,
          isLoggedIn: true,
          actions,
        }));
      } else {
        setAuthData((state) => ({
          ...state,
          status: 'success',
          isLoggedIn: false,
          actions,
        }));
      }
    };
    fetchData();
  }, [setAuthData, login, logout, getNextMark]);

  return (
    <AuthContext.Provider value={authData}>
      {status !== 'pending' ? children : null}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuthState() {
  const state = React.useContext(AuthContext);
  return state;
}
