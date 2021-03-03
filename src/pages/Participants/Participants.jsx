import React from 'react';
import { Table } from 'react-bootstrap';
import { NOMINATIONS } from '../../mock';
import { PARTICIPANTS } from '../../mock/participants';
import { ParticipantsWrapperElement } from './elements';
import { ReactComponent as ArrowIcon } from '../../shared/assets/icons/arrow-down-right-circle.svg';
import { Link } from 'react-router-dom';

export const Participants = () => {
  return (
    <ParticipantsWrapperElement>
      <h3>Участники </h3>
      <Table hover bordered responsive striped size="sm">
        <thead>
          <tr>
            <th>№</th>
            {NOMINATIONS.map(({ name, id }) => (
              <th key={id}>{name}</th>
            ))}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {PARTICIPANTS.map(({ id, nominations }) => (
            <tr key={id}>
              <td>{id}</td>
              {Object.keys(nominations).map((field) => (
                <td key={`${id}-$${field}`}>{nominations[field].mark || '-'}</td>
              ))}
              <td>
                <Link to={`participants/${id}`}>
                  <ArrowIcon color="black" width="1.1rem" height="1.1rem" />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </ParticipantsWrapperElement>
  );
};
