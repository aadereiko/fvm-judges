import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import { nominationPropType, participantPropType } from '../../shared/propTypes';
import { regionUsersMap } from '../../mock/regions';
import { ParticipantPlacesWrapperElement, RegionTDElement } from './elements';

export const ParticipantPlaces = ({ marks, nominations, participants }) => {
  const fulfilledParticipantsWithMarks = useMemo(() => {
    const participantsWithMarks = [];

    for (let i = 0; i < participants.length; i++) {
      let canUserBeWinner = true;
      let userSum = 0;

      for (let j = 0; j < nominations.length && canUserBeWinner; j++) {
        if (nominations[j]?.name !== 'Фотоистория') {
          let currentMark =
            marks && marks[participants[i].id] && marks[participants[i].id][nominations[j].id];

          if (!currentMark || !currentMark.idea || !currentMark.look) {
            canUserBeWinner = false;
            break;
          }

          const avg = (currentMark.idea + currentMark.look) / 2;
          userSum += avg;
        }
      }

      if (canUserBeWinner) {
        participantsWithMarks.push({
          participant: participants[i],
          marks: userSum,
          isMinsk: regionUsersMap[participants[i].name],
        });
      }
    }

    participantsWithMarks.sort((a, b) => b.marks - a.marks);
    return participantsWithMarks;
  }, [marks, nominations, participants]);

  return (
    <ParticipantPlacesWrapperElement>
      <div>
        <p>Минск</p>
        <Table hover bordered responsive striped size="sm">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Участник</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {fulfilledParticipantsWithMarks
              .filter((participant) => !participant.isMinsk)
              .map(({ participant, marks: participantMarks }, i) => {
                return (
                  <tr key={participant.id}>
                    <td>{i + 1}</td>
                    <td>
                      {participant?.name} ({participant.id})
                    </td>
                    <td>{participantMarks}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      <div>
        <p>Регионы</p>

        <Table hover bordered responsive striped size="sm">
          <thead>
            <tr>
              <th>Номер</th>
              <th>Участник</th>
              <th>Регион</th>
              <th>Баллы</th>
            </tr>
          </thead>
          <tbody>
            {fulfilledParticipantsWithMarks
              .filter((participant) => participant.isMinsk)
              .map(({ participant, marks: participantMarks }, i) => {
                return (
                  <tr key={participant.id}>
                    <td>{i + 1}</td>
                    <td>
                      {participant?.name} ({participant.id})
                    </td>
                    <td>{regionUsersMap[participant.name] || 'Минск'} </td>
                    <td>{participantMarks}</td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>
    </ParticipantPlacesWrapperElement>
  );
};

ParticipantPlaces.propTypes = {
  marks: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
};
