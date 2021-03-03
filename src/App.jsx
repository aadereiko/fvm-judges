import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { AuthProvider } from './contexts';
import { Main } from './pages/Main';

function App() {
  return (
    <AuthProvider>
      <Main />
    </AuthProvider>
  );
}

export default App;
