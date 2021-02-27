import React, { useMemo } from 'react';
import {
  ParticipantTitleElement,
  ParticipantWrapperElement,
  PhotosWrapperElement,
  CardElement,
} from './elements';
import PropTypes from 'prop-types';
import { PARTICIPANTS } from '../../mock/participants';
import { Card, Table } from 'react-bootstrap';
import { NOMINATIONS } from '../../mock';

export const Participant = ({ id }) => {
  const currentParticipant = useMemo(() => PARTICIPANTS[id], [id]);

  return (
    <ParticipantWrapperElement>
      <h3>Участник: {id}</h3>
      <ParticipantTitleElement>Фото:</ParticipantTitleElement>
      <PhotosWrapperElement>
        {[1, 2, 3, 4, 5, 6, 7].map((nominationId) => (
          <CardElement key={nominationId}>
            <Card.Img variant="top" src={currentParticipant.nominations[nominationId].img} />
            <Card.Body>
              <Card.Title>{NOMINATIONS[nominationId - 1].name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Оценка: {currentParticipant.nominations[nominationId].mark}
              </Card.Subtitle>
            </Card.Body>
          </CardElement>
        ))}
      </PhotosWrapperElement>
    </ParticipantWrapperElement>
  );
};

Participant.propTypes = {
  id: PropTypes.string.isRequired,
};
