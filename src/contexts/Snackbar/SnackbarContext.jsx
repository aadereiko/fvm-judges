import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createContext } from 'react';
import { createPortal } from 'react-dom';
import { SnackbarWrapperElement } from './elements';

export const SnackbarContext = createContext();

const snackbarInit = {
  isShown: false,
  isSuccess: false,
  text: '',
};

export const SnackbarProvider = ({ children }) => {
  const [snackbarStatus, setSnackbarStatus] = useState(snackbarInit);

  useEffect(() => {
    if (snackbarStatus.isShown) {
      const closeTimeOut = setTimeout(() => {
        setSnackbarStatus({
          isShown: false,
          text: '',
          isSuccess: false,
        });
      }, 6000);

      return () => {
        clearTimeout(closeTimeOut);
      };
    }
  }, [snackbarStatus.isShown]);

  return (
    <SnackbarContext.Provider value={{ setSnackbarStatus }}>
      {snackbarStatus.isShown &&
        createPortal(
          <SnackbarWrapperElement>{snackbarStatus.text}</SnackbarWrapperElement>,
          document.getElementById('snackbar-container'),
        )}
      {children}
    </SnackbarContext.Provider>
  );
};

SnackbarProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useSnackbarContext() {
  const state = useContext(SnackbarContext);
  return state;
}
