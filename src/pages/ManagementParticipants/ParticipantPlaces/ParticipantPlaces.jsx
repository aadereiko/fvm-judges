import React, { useMemo } from 'react';
import PropTypes from 'prop-types';

import { Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { nominationPropType, participantPropType } from '../../../shared/propTypes';
import { RegionTDElement } from '../elements';
import { ParticipantPlacesWrapperElement } from './elements';
import { regionUsersMap } from '../../../mock/regions';

export const ParticipantPlaces = ({ marks, nominations, participants }) => {
  const [regionsMax, minskMax] = useMemo(() => {
    let maxRegionSum = Number.MIN_VALUE;
    let regionParticipants = [];
    let maxMinskSum = Number.MIN_VALUE;
    let minskParticipants = [];

    for (let i = 0; i < participants.length; i++) {
      let isMinsk = !regionUsersMap[participants[i].name];
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

        if (!isMinsk) {
          if (maxRegionSum < userSum) {
            maxRegionSum = userSum;
          }
        } else {
          if (maxMinskSum < userSum) {
            maxMinskSum = userSum;
          }
        }
      }
    }

    for (let i = 0; i < participants.length; i++) {
      let isMinsk = !regionUsersMap[participants[i].name];
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

      if (!isMinsk) {
        if (userSum === maxRegionSum) {
          regionParticipants.push(participants[i]);
        }
      } else {
        if (userSum === maxMinskSum) {
          minskParticipants.push(participants[i]);
        }
      }
    }

    return [
      {
        participants: regionParticipants,
        points: maxRegionSum,
      },
      {
        participants: minskParticipants,
        points: maxMinskSum,
      },
      ,
    ];
  }, [marks, nominations, participants]);

  return (
    <ParticipantPlacesWrapperElement>
      <Table hover bordered responsive striped size="sm">
        <thead>
          <tr>
            {nominations.map((nomination) => (
              <th key={nomination.id}>{nomination.name}</th>
            ))}
            <th>Регионы </th>
            <th>1 место</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            {nominations.map((nomination) => {
              let maxVal = Number.MIN_VALUE;
              const maxParticipants = [];
              participants.forEach((participant) => {
                if (!regionUsersMap[participant.name]) {
                  const value =
                    marks && marks[participant.id] && marks[participant.id][nomination.id];
                  if (value) {
                    const avg = (value.idea + value.look) / 2;
                    if (avg > maxVal) {
                      maxVal = avg;
                    }
                  }
                }
              });

              participants.forEach((participant) => {
                if (!regionUsersMap[participant.name]) {
                  const value =
                    marks && marks[participant.id] && marks[participant.id][nomination.id];
                  if (value) {
                    const avg = (value.idea + value.look) / 2;

                    if (avg == maxVal) {
                      maxParticipants.push(participant);
                    }
                  }
                }
              });

              return (
                <td key={`${nomination.id}`}>
                  <b>Баллы</b>: {maxVal}
                  <br></br>
                  <b>Участники</b>:<br></br>
                  {maxParticipants.map((participant) => (
                    <>
                      <span key={participant.id}>
                        {participant?.name} ({participant?.id})
                      </span>
                      <br></br>
                    </>
                  ))}
                </td>
              );
            })}
            <td>
              <b>Баллы</b>: {regionsMax?.points}
              <br></br>
              <b>Участники</b>:<br></br>
              {regionsMax?.participants?.map((participant) => (
                <>
                  <span key={participant?.id}>
                    {participant?.name} ({participant?.id})
                  </span>
                  <br></br>
                </>
              ))}
            </td>
            <td>
              <b>Баллы</b>: {minskMax?.points}
              <br></br>
              <b>Участники</b>:<br></br>
              {minskMax?.participants?.map((participant) => (
                <>
                  <span key={participant?.id}>
                    {participant?.name} ({participant?.id})
                  </span>
                  <br></br>
                </>
              ))}
            </td>
          </tr>
        </tbody>
      </Table>
    </ParticipantPlacesWrapperElement>
  );
};

ParticipantPlaces.propTypes = {
  marks: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
};
