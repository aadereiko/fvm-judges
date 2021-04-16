import React from 'react';
import get from 'lodash.get';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { ReactComponent as DashIcon } from '../../shared/assets/icons/dash-circle.svg';
import { FlexColumnCenteredWrapperElement, LinkToPhotoElement } from './elements';

export const generateParticipantTableTds = (
  nominations,
  participants,
  marks,
  isWithLinks = false,
  rightColumnsCallback = () => {},
) => {
  const renderMarkCell = ({ nomination, participant, ideaMark, lookMark }) => {
    return isWithLinks ? (
      <LinkToPhotoElement to={`/photos/${nomination.id}/${participant.id}`}>
        {ideaMark}
        <span className="text-muted">{' | '}</span>
        {lookMark}
      </LinkToPhotoElement>
    ) : (
      <div>
        {ideaMark}
        <span className="text-muted">{' | '}</span>
        {lookMark}
      </div>
    );
  };

  return participants.map((participant) => (
    <tr key={participant._id}>
      <td>{participant.id}</td>
      {nominations.map((nomination) => {
        const ideaMark = get(marks, `${nomination.id}.${participant.id}.idea`, false);
        const lookMark = get(marks, `${nomination.id}.${participant.id}.look`, false);
        const avgMark = ideaMark && lookMark ? (ideaMark + lookMark) / 2 : 0;

        return marks && marks[nomination.id] && marks[nomination.id][participant.id] ? (
          <td className="text-center" key={`${participant._id}-${nomination._id}`}>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  <FlexColumnCenteredWrapperElement>
                    <span>Идея: {ideaMark}</span>
                    <span>Реализация: {lookMark}</span>
                    <span>Средняя: {avgMark}</span>
                  </FlexColumnCenteredWrapperElement>
                </Tooltip>
              }
            >
              {renderMarkCell({ nomination, participant, ideaMark, lookMark })}
            </OverlayTrigger>
          </td>
        ) : (
          <td className="text-center" key={`${participant._id}-${nomination._id}`}>
            <OverlayTrigger
              overlay={
                <Tooltip>
                  <span>Нет фото</span>
                </Tooltip>
              }
            >
              {/* <DashIcon fill="red" />
               */}
              <span>-</span>
            </OverlayTrigger>
          </td>
        );
      })}
      {rightColumnsCallback && rightColumnsCallback({ participant })}
    </tr>
  ));
};

export const renderTooltipedMarkLabel = ({ idea, look } = { idea: 0, look: 0 }) => {
  const avg = idea && look ? (idea + look) / 2 : 0;

  return (
    <OverlayTrigger
      overlay={
        <Tooltip>
          <FlexColumnCenteredWrapperElement>
            <span>Идея: {idea}</span>
            <span>Реализация: {look}</span>
            <span>Средняя: {avg}</span>
          </FlexColumnCenteredWrapperElement>
        </Tooltip>
      }
    >
      <div>
        {idea}
        <span className="text-muted">{' | '}</span>
        {look}
      </div>
    </OverlayTrigger>
  );
};
