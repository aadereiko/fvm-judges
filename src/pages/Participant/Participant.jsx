import React, { useMemo } from 'react';
import {
  ParticipantTitleElement,
  ParticipantWrapperElement,
  PhotosWrapperElement,
  CardElement,
} from './elements';
import PropTypes from 'prop-types';
import { PARTICIPANTS } from '../../mock/participants';
import { Card } from 'react-bootstrap';
import { NOMINATIONS } from '../../mock';
import { Link } from 'react-router-dom';

export const Participant = ({ id }) => {
  const currentParticipant = useMemo(() => PARTICIPANTS[id], [id]);

  return (
    <ParticipantWrapperElement>
      <h3>Участник {id}</h3>
      <ParticipantTitleElement className="text-muted">Фото:</ParticipantTitleElement>
      <PhotosWrapperElement>
        {[1, 2, 3, 4, 5, 6, 7].map((nominationId) => (
          <CardElement
            key={nominationId}
            bg={currentParticipant.nominations[nominationId].mark ? 'light' : 'dark'}
            text={currentParticipant.nominations[nominationId].mark ? 'dark' : 'light'}
          >
            <Card.Img variant="top" src={currentParticipant.nominations[nominationId].img} />
            <Card.Body>
              <Card.Title>{NOMINATIONS[nominationId - 1].name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Оценка: {currentParticipant.nominations[nominationId].mark || '-'}
              </Card.Subtitle>
              <Card.Link as={Link} to={`/nominations/${nominationId}`}>
                Номинация
              </Card.Link>
              <br></br>
              <Card.Link href="#">Оценить</Card.Link>
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
