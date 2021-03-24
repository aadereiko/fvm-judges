import React from 'react';
import { Spinner } from 'react-bootstrap';

export const Loader = () => {
  return (
    <>
      <Spinner animation="border" size="sm" /> Загрузка...
    </>
  );
};
