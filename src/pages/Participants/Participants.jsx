import React from 'react';
import PropTypes from 'prop-types';
import { nominationPropType } from '../../shared/propTypes/nominations';
import { participantPropType } from '../../shared/propTypes/participants';
import { Table } from 'react-bootstrap';
import { ParticipantsWrapperElement } from './elements';
import { ReactComponent as ArrowIcon } from '../../shared/assets/icons/arrow-down-right-square.svg';
import { Link } from 'react-router-dom';

export const Participants = ({ participants, nominations }) => {
  participants.map((participant) =>
    nominations.map((nomination) => {
      if (participant.nominations[nomination.id]) {
        console.log(`${participant.id}-${nomination.id}`);
      } else {
        console.log(`${participant.id}-${nomination.id}`);
      }
    }),
  );
  return (
    <ParticipantsWrapperElement>
      <h3>Участники </h3>
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
          {participants.map((participant) => (
            <tr key={participant.id}>
              <td>{participant.id}</td>
              {nominations.map((nomination) =>
                participant.nominations[nomination.id] ? (
                  <td key={`${participant.id}-${nomination.id}`}>
                    {participant.nominations[nomination.id].mark || '-'}
                  </td>
                ) : (
                  <td key={`${participant.id}-${nomination.id}`}>NO</td>
                ),
              )}
              <td>
                <Link to={`participants/${participant.id}`}>
                  <ArrowIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ParticipantsWrapperElement>
  );
};

Participants.propTypes = {
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
};
