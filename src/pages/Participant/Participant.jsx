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
import { Loader } from '../../shared';
import { renderTooltipedMarkLabel } from '../../shared/helpers/mark';

export const Participant = ({ id, participant, isLoading, marks, withoutMarks, isAdmin }) => {
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
      {(isLoading && <Loader />) || (
        <>
          <ParticipantTitleElement className="text-muted">Фото:</ParticipantTitleElement>
          <PhotosWrapperElement>
            {Object.keys(participant.nominations).map((nominationKey) => (
              <React.Fragment key={nominationKey}>
                {nominationKey != '0' && (
                  <CardElement>
                    {participant.nominations[nominationKey].photo.map((photo, index) => (
                      <Card.Img
                        variant="top"
                        src={photos[photo.name] ? photos[photo.name].link : ''}
                        key={index}
                      />
                    ))}
                    <Card.Body>
                      <Card.Title>{participant.nominations[nominationKey].name}</Card.Title>
                      {!withoutMarks && (
                        <Card.Text>
                          <span className="text-muted">Оценки:</span>
                          {renderTooltipedMarkLabel(marks[nominationKey][id])}
                        </Card.Text>
                      )}
                      <Card.Link
                        as={Link}
                        to={`${isAdmin ? '/management' : ''}/nominations/${nominationKey}`}
                      >
                        Номинация
                      </Card.Link>
                      <br></br>
                      {!withoutMarks && (
                        <Card.Link as={Link} to={`/photos/${nominationKey}/${id}`}>
                          Оценить
                        </Card.Link>
                      )}
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
  marks: PropTypes.object.isRequired,
  withoutMarks: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};
