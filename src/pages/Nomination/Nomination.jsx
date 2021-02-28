import React from 'react';
import PropTypes from 'prop-types';
import { NominationWrapperElement, CardElement, PhotosWrapperElement } from './elements';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Nomination = ({ name, id, photos }) => {
  return (
    <NominationWrapperElement>
      <h3>{name}</h3>
      <h4 className="text-muted">Фото: </h4>
      <PhotosWrapperElement>
        {photos.map((photo) => (
          <CardElement
            key={photo.participantId}
            bg={photo.mark ? 'light' : 'dark'}
            text={photo.mark ? 'dark' : 'light'}
          >
            <Card.Img variant="top" src={photo.img} />
            <Card.Body>
              <Card.Title>Участник {photo.participantId}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">Оценка: {photo.mark || '-'}</Card.Subtitle>
              <Card.Link as={Link} to={`/participants/${photo.participantId}`}>
                Участник
              </Card.Link>
              <br></br>
              <Card.Link as={Link} to={`/photos/${id}/${photo.participantId}`}>
                Оценить
              </Card.Link>
            </Card.Body>
          </CardElement>
        ))}
      </PhotosWrapperElement>
    </NominationWrapperElement>
  );
};

Nomination.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      mark: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      participantId: PropTypes.number.isRequired,
    }),
  ).isRequired,
};
