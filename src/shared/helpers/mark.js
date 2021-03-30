import React from 'react';
import get from 'lodash.get';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as DashIcon } from '../../shared/assets/icons/dash-circle.svg';

export const generateParticipantTableTds = (
  nominations,
  participants,
  marks,
  rightColumnsCallback = () => {},
) => {
  return participants.map((participant) => (
    <tr key={participant._id}>
      <td>{participant.id}</td>
      {nominations.map((nomination) => {
        const ideaMark = get(marks, `${nomination.id}.${participant.id}.idea`, false);
        const lookMark = get(marks, `${nomination.id}.${participant.id}.look`, false);
        const avgMark = ideaMark && lookMark ? (ideaMark + lookMark) / 2 : 0;

        return marks[nomination.id][participant.id] ? (
          <td className="text-center" key={`${participant._id}-${nomination._id}`}>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  <div
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <span>Идея: {ideaMark}</span>
                    <span>Реализация: {lookMark}</span>
                    <span>Средняя: {avgMark}</span>
                  </div>
                </Tooltip>
              }
            >
              <div>
                {ideaMark}
                <span className="text-muted">{' | '}</span>
                {lookMark}
              </div>
            </OverlayTrigger>
          </td>
        ) : (
          <td className="text-center" key={`${participant._id}-${nomination._id}`}>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  <div
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <span>Нет фото</span>
                  </div>
                </Tooltip>
              }
            >
              <DashIcon fill="red" />
            </OverlayTrigger>
          </td>
        );
      })}
      {rightColumnsCallback && rightColumnsCallback({ participant })}
    </tr>
  ));
};
