import React from 'react';
import {
  ParticipantTitleElement,
  ParticipantWrapperElement,
  PhotosWrapperElement,
  CardElement,
} from './elements';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// const getNominationId = (photo) => {
//   let name = photo.name.toLowerCase().split('_');
//   return name[name.length - 1].split('.jpg')[0];
// };

export const Participant = ({ id, participant, isLoading }) => {
  console.log(participant);
  return (
    <ParticipantWrapperElement>
      <h3>Участник {id}</h3>
      {(isLoading && 'Загрузка...') || (
        <>
          <ParticipantTitleElement className="text-muted">Фото:</ParticipantTitleElement>
          <PhotosWrapperElement>
            {Object.keys(participant.nominations).map((nominationKey) => (
              <>
                {nominationKey != '0' && (
                  <CardElement
                    key={nominationKey}
                    // bg={currentParticipant.nominations[nominationId].mark ? 'light' : 'dark'}
                    // text={currentParticipant.nominations[nominationId].mark ? 'dark' : 'light'}
                  >
                    {participant.nominations[nominationKey].photo.map((photo, index) => (
                      <Card.Img variant="top" src={photo.link} key={index} />
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
                      {/* <Card.Link as={Link} to={`/photos/${nominationId}/${id}`}>
                        Оценить
                      </Card.Link> */}
                    </Card.Body>
                  </CardElement>
                )}
              </>
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
