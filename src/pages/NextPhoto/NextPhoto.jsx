import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router';
import { useAuthState } from '../../contexts';

export const NextPhoto = () => {
  const { nextMark } = useAuthState();
  return (
    <Redirect
      to={
        nextMark && nextMark.nominationId && nextMark.participantId
          ? `/photos/${nextMark.nominationId}/${nextMark.participantId}`
          : ''
      }
    />
  );
};
