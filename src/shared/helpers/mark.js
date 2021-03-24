import React from 'react';
import get from 'lodash.get';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

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
        const ideaMark = get(marks, `${nomination.id}.${participant.id}.idea`, 0);
        const lookMark = get(marks, `${nomination.id}.${participant.id}.look`, 0);
        const avgMark = ideaMark && lookMark ? (ideaMark + lookMark) / 2 : 0;

        return (
          <td key={`${participant._id}-${nomination._id}`}>
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
        );
      })}
      {rightColumnsCallback && rightColumnsCallback({ participant })}
    </tr>
  ));
};
