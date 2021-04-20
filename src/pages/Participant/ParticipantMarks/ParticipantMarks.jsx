import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { ParticipantMarksWrapperElement } from './elements';
import { nominationPropType, userPropType } from '../../../shared/propTypes';
import { renderTooltipedMarkLabel } from '../../../shared/helpers/mark';
import { Link } from 'react-router-dom';

export const ParticipantMarks = ({ marks, nominations, users }) => {
  const usernames = Object.keys(marks[Object.keys(marks)[0]]);
  const judges = users.filter(({ role }) => role === 'judge');

  return (
    <ParticipantMarksWrapperElement>
      <Table hover bordered responsive striped size="sm">
        <thead>
          <tr>
            <th>Пользователь</th>
            {nominations.map((nomination) => (
              <th key={nomination.id}>{nomination.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {judges.map(({ username, name, _id }) => (
            <tr key={username}>
              <td>
                <Link to={`/management/${_id}`}>{name}</Link>
              </td>
              {nominations.map((nomination) => {
                const value = marks[nomination.id][username];

                return (
                  <td key={`${username}-${nomination.id}`}>
                    {(value && renderTooltipedMarkLabel(value)) || '-'}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </Table>
    </ParticipantMarksWrapperElement>
  );
};

ParticipantMarks.propTypes = {
  marks: PropTypes.object.isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  users: PropTypes.arrayOf(userPropType).isRequired,
};
