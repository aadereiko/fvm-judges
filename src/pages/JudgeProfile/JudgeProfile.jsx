import React, { useEffect } from 'react';
import PropTypes, { shape } from 'prop-types';
import { JudgeProfileWrapperElement } from './elements';
import { Table } from 'react-bootstrap';
import { nominationPropType, participantPropType } from '../../shared/propTypes';
import { generateParticipantTableTds } from '../../shared/helpers/mark';
import { Loader } from '../../shared';

export const JudgeProfile = ({ name, username, marks, isLoading, nominations, participants }) => {
  return !isLoading ? (
    <JudgeProfileWrapperElement>
      <header>
        <h3>{name}</h3>
        <h4>логин: {username}</h4>
      </header>
      <h4 className="text-muted">Оценки: </h4>
      {marks && (
        <Table hover bordered responsive striped size="sm">
          <thead>
            <tr>
              <th>Участник</th>
              {nominations.map((nomination) => (
                <th key={nomination.id}>{nomination.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{generateParticipantTableTds(nominations, participants, marks)}</tbody>
        </Table>
      )}
    </JudgeProfileWrapperElement>
  ) : (
    <Loader />
  );
};

JudgeProfile.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  marks: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
};
