import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { NominationWrapperElement, CardElement, PhotosWrapperElement } from './elements';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Nomination = ({ name, id, photos, isLoading }) => {
  // const [allPhotos, setAllPhotos] = useState({});
  // useEffect(() => {
  //   photos.map((item) => {
  //     fetch(`/api/google/photo/${item}`)
  //       .then((response) => response.json())
  //       .then(({ name, link }) => {
  //         setAllPhotos((prevState) => ({ ...prevState, [item]: { name, link } }));
  //       })
  //       .catch((err) => console.log(err));
  //   });
  // }, [photos]);
  return (
    <NominationWrapperElement>
      <h3>{name}</h3>
      {(isLoading && 'Загрузка...') || (
        <>
          <h4 className="text-muted">Фото: </h4>
          <PhotosWrapperElement>
            {photos.map((photo) => (
              <CardElement
                key={photo.name}
                // bg={photo.mark ? 'light' : 'dark'}
                // text={photo.mark ? 'dark' : 'light'}
              >
                <Card.Img variant="top" src={photo.link} />
                <Card.Body>
                  <Card.Title>Участник {photo.name.split('_')[0]}</Card.Title>
                  {/* <Card.Subtitle className="mb-2 text-muted">Оценка: {photo.mark || '-'}</Card.Subtitle> */}
                  <Card.Link as={Link} to={`/participants/${photo.name.split('_')[0]}`}>
                    Участник
                  </Card.Link>
                  <br></br>
                  {/* <Card.Link as={Link} to={`/photos/${id}/${photo.name.split('_')[0]}`}>
                Оценить
              </Card.Link> */}
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
  id: PropTypes.number.isRequired,
  photos: PropTypes.arrayOf(
    PropTypes.shape({
      mark: PropTypes.number.isRequired,
      img: PropTypes.string.isRequired,
      participantId: PropTypes.number.isRequired,
    }),
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
