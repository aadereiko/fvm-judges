import React, { useState, useEffect } from 'react';
import {
  ParticipantTitleElement,
  ParticipantWrapperElement,
  PhotosWrapperElement,
  CardElement,
} from './elements';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const Participant = ({ id, participant, isLoading }) => {
  const [photos, setPhotos] = useState({});
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
    Object.keys(participant.nominations).map((nominationKey) =>
      participant.nominations[nominationKey].photo.map((photo) => getPhotoLink(photo.id)),
    );
  }, []);
  return (
    <ParticipantWrapperElement>
      <h3>Участник {id}</h3>
      {(isLoading && 'Загрузка...') || (
        <>
          <ParticipantTitleElement className="text-muted">Фото:</ParticipantTitleElement>
          <PhotosWrapperElement>
            {Object.keys(participant.nominations).map((nominationKey) => (
              <React.Fragment key={nominationKey}>
                {nominationKey != '0' && (
                  <CardElement
                  // bg={currentParticipant.nominations[nominationId].mark ? 'light' : 'dark'}
                  // text={currentParticipant.nominations[nominationId].mark ? 'dark' : 'light'}
                  >
                    {participant.nominations[nominationKey].photo.map((photo, index) => (
                      <Card.Img
                        variant="top"
                        src={photos[photo.name] ? photos[photo.name].link : ''}
                        key={index}
                      />
                    ))}
                    <Card.Body>
                      <Card.Title>{nominationKey}</Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted">
                    Оценка: {currentParticipant.nominations[nominationId].mark || '-'}
                  </Card.Subtitle> */}
                      <Card.Link as={Link} to={`/nominations/${nominationKey}`}>
                        Номинация
                      </Card.Link>
                      <br></br>
                      <Card.Link as={Link} to={`/photos/${nominationKey}/${id}`}>
                        Оценить
                      </Card.Link>
                    </Card.Body>
                  </CardElement>
                )}
              </React.Fragment>
            ))}
          </PhotosWrapperElement>
        </>
      )}
    </ParticipantWrapperElement>
  );
};

Participant.propTypes = {
  id: PropTypes.string.isRequired,
  participant: PropTypes.object,
  isLoading: PropTypes.bool.isRequired,
};
