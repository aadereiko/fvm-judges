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

const getNominationId = (photo) => {
  let name = photo.name.split('_');
  return name[name.length - 1].split('.JPG')[0];
};

export const Participant = ({ id, participant }) => {
  const currentParticipant = useMemo(() => PARTICIPANTS[id], [id]);
  console.log(participant);
  return (
    <ParticipantWrapperElement>
      <h3>Участник {id}</h3>
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
                  <Card.Link
                    as={Link}
                    to={`/nominations/${getNominationId(
                      participant.nominations[nominationKey].photo[0],
                    )}`}
                  >
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
    </ParticipantWrapperElement>
  );
};

Participant.propTypes = {
  id: PropTypes.string.isRequired,
  participant: PropTypes.object,
};
