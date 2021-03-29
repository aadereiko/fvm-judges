import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NominationWrapperElement, CardElement, PhotosWrapperElement } from './elements';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { photoPropType } from '../../shared/propTypes';
import { Loader } from '../../shared';

export const Nomination = ({ name, id, photos, isLoading }) => {
  const [nominationPhotos, setPhotos] = useState({});
  const getPhotoLink = async (photoId) => {
    fetch(`
      /api/google/photo/${photoId}
    `)
      .then((response) => response.json())
      .then(({ name, link, id }) => {
        setPhotos((prevState) => ({ ...prevState, [name]: { name, link, id } }));
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    photos.map((photo) => getPhotoLink(photo.id));
  }, [photos]);
  return (
    <NominationWrapperElement>
      <h3>{name}</h3>
      {(isLoading && <Loader />) || (
        <>
          <h4 className="text-muted">Фото: </h4>
          <PhotosWrapperElement>
            {photos.map((photo) => (
              <CardElement
                key={photo.name}
                // bg={photo.mark ? 'light' : 'dark'}
                // text={photo.mark ? 'dark' : 'light'}
              >
                <Card.Img
                  variant="top"
                  loading="lazy"
                  src={nominationPhotos[photo.name] ? nominationPhotos[photo.name].link : ''}
                />
                <Card.Body>
                  <Card.Title>Участник {photo.name.split('_')[0]}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Оценка: {photo.mark || '-'}</Card.Subtitle> */}
                  <Card.Link as={Link} to={`/participants/${photo.name.split('_')[0]}`}>
                    Участник
                  </Card.Link>
                  <br></br>
                  <Card.Link as={Link} to={`/photos/${id}/${photo.name.split('_')[0]}`}>
                    Оценить
                  </Card.Link>
                </Card.Body>
              </CardElement>
            ))}
          </PhotosWrapperElement>
        </>
      )}
    </NominationWrapperElement>
  );
};

Nomination.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  photos: PropTypes.arrayOf(photoPropType).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
