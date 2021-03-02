import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NominationWrapperElement, CardElement, PhotosWrapperElement } from './elements';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Nomination = ({ name, id, photos }) => {
  const [allPhotos, setAllPhotos] = useState({});
  useEffect(() => {
    photos.map((item) => {
      fetch(`/api/google/photo?photoId=${item}`)
        .then((response) => response.json())
        .then(({ name, photo }) => {
          setAllPhotos((prevState) => ({ ...prevState, [item]: { name, photo } }));
        })
        .catch((err) => console.log(err));
    });
  }, [photos]);
  return (
    <NominationWrapperElement>
      <h3>{name}</h3>
      <h4 className="text-muted">Фото: </h4>
      <PhotosWrapperElement>
        {photos.map((photoId) => (
          <CardElement
            key={photoId}
            // bg={photo.mark ? 'light' : 'dark'}
            // text={photo.mark ? 'dark' : 'light'}
          >
            <Card.Img variant="top" src={allPhotos[photoId] ? allPhotos[photoId].photo : ''} />
            <Card.Body>
              <Card.Title>Участник {allPhotos[photoId] ? allPhotos[photoId].name : ''}</Card.Title>
              {/* <Card.Subtitle className="mb-2 text-muted">Оценка: {photo.mark || '-'}</Card.Subtitle> */}
              <Card.Link
                as={Link}
                to={`/participants/${allPhotos[photoId] ? allPhotos[photoId].name : ''}`}
              >
                Участник
              </Card.Link>
              <br></br>
              <Card.Link as={Link} to={`/photos/${id}/${photoId}`}>
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
