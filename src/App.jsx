import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { AuthProvider } from './contexts';
import { SnackbarProvider } from './contexts/Snackbar/SnackbarContext';
import { Main } from './pages/Main';

function App() {
  return (
    <AuthProvider>
      <SnackbarProvider>
        <Main />
      </SnackbarProvider>
    </AuthProvider>
  );
}

export default App;
