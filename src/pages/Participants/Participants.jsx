import React from 'react';
import PropTypes from 'prop-types';
import { nominationPropType } from '../../shared/propTypes/nominations';
import { participantPropType } from '../../shared/propTypes/participants';
import { Table } from 'react-bootstrap';
import { ParticipantsWrapperElement } from './elements';
import { ReactComponent as ArrowIcon } from '../../shared/assets/icons/arrow-down-right-circle.svg';
import { Link } from 'react-router-dom';
import { generateParticipantTableTds } from '../../shared/helpers/mark';
import { Loader } from '../../shared';

export const Participants = ({ participants, nominations, isLoading, marks }) => {
  return (
    <ParticipantsWrapperElement>
      <h3>Участники </h3>
      {(isLoading && <Loader />) || (
        <Table hover bordered responsive striped size="sm">
          <thead>
            <tr>
              <th>№</th>
              {nominations.map(({ name, id }) => (
                <th key={id}>{name}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {generateParticipantTableTds(nominations, participants, marks, ({ participant }) => (
              <td>
                <Link to={`participants/${participant.id}`}>
                  <ArrowIcon fill="black" />
                </Link>
              </td>
            ))}
          </tbody>
        </Table>
      )}
    </ParticipantsWrapperElement>
  );
};

Participants.propTypes = {
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  isLoading: PropTypes.bool.isRequired,
  marks: PropTypes.object.isRequired,
};
