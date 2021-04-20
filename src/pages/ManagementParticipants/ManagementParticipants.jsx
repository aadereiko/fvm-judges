import React from 'react';
import PropTypes from 'prop-types';

import { Loader } from '../../shared';
import { ManagementPraticipantsWrapperElement } from './elements';
import { ReactComponent as DashIcon } from '../../shared/assets/icons/dash-circle.svg';
import { ReactComponent as CheckedIcon } from '../../shared/assets/icons/check-circle.svg';

import { OverlayTrigger, Table, Tooltip } from 'react-bootstrap';
import { nominationPropType, participantPropType } from '../../shared/propTypes';
import { Link } from 'react-router-dom';

export const ManagementParticipants = ({ isLoading, marks, nominations, participants }) => {
  return (
    <ManagementPraticipantsWrapperElement>
      <h3>Участники</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table hover bordered responsive striped size="sm">
            <thead>
              <tr>
                <th>Участник </th>
                {nominations.map((nomination) => (
                  <th key={nomination.id}>{nomination.name}</th>
                ))}
                <th>
                  <OverlayTrigger
                    overlay={
                      <Tooltip>
                        <span>Все ли члены жюри оценили участника</span>
                      </Tooltip>
                    }
                  >
                    <span>Готовность</span>
                  </OverlayTrigger>
                </th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant) => (
                <tr key={participant.id}>
                  <td>
                    <Link to={`/management/participants/${participant.id}`}>{participant.id}</Link>
                  </td>
                  {nominations.map((nomination) => {
                    const value =
                      marks && marks[participant.id] && marks[participant.id][nomination.id];
                    return (
                      <td key={`${participant.id}-${nomination.id}`}>
                        {value ? (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                <div className="flex-center-column">
                                  <span>Идея: {value.idea}</span>
                                  <span>Реализация: {value.look}</span>
                                  <span>Средняя: {(value.idea + value.look) / 2}</span>
                                </div>
                              </Tooltip>
                            }
                          >
                            <span>{(value.idea + value.look) / 2}</span>
                          </OverlayTrigger>
                        ) : (
                          <OverlayTrigger
                            overlay={
                              <Tooltip>
                                <span>Нет фото</span>
                              </Tooltip>
                            }
                          >
                            <span>-</span>
                          </OverlayTrigger>
                        )}
                      </td>
                    );
                  })}
                  <td>
                    {!marks[participant.id].isFinished % 2 ? (
                      <DashIcon fill="red" />
                    ) : (
                      <CheckedIcon fill="green" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </ManagementPraticipantsWrapperElement>
  );
};

ManagementParticipants.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  marks: PropTypes.object.isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
};
