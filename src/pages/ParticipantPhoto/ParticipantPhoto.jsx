import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import {
  ParticipantPhotoWrapperElement,
  PhotoWrapperElement,
  PhotoInfoBlockElement,
  StarsWrapperElement,
  StarIconElement,
  StarFillIconElement,
  MarkLabelElement,
  MarksWrapperElement,
  ArrowLeftIconElement,
  ArrowRightLinkElement,
} from './elements';
import { photoPropType } from '../../shared/propTypes';
import { Link } from 'react-router-dom';
import { Loader } from '../../shared';

import { ReactComponent as ArrowRightIcon } from '../../shared/assets/icons/arrow-right-circle-fill.svg';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';

const getMarkStar = (currentMark, setMark, section, clickCallback = () => {}) => {
  const props = {
    key: `${section}-${currentMark}`,
    height: '1.3rem',
    width: '1.3rem',
    onClick: clickCallback,
  };

  return currentMark > setMark ? (
    <StarIconElement {...props} />
  ) : (
    <StarFillIconElement {...props} />
  );
};

const getFullImage = (photoLink) => {
  return (photoLink && photoLink.split('=s220')[0]) || '';
};

export const ParticipantPhoto = ({
  participantId,
  nominationId,
  nominationName,
  photo,
  mark,
  isLoading,
  onMarkChange,
}) => {
  const marks = useMemo(() => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], []);
  const [look, setLook] = useState((mark && mark.look) || 0);
  const [idea, setIdea] = useState((mark && mark.idea) || 0);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const setMarks = (mark, type) => {
    type == 'look' ? setLook(mark) : setIdea(mark);
    onMarkChange({ mark, type });
  };

  useEffect(() => {
    setLook((mark && mark.look) || 0);
    setIdea((mark && mark.idea) || 0);
  }, [mark, participantId, nominationId, setLook, setIdea]);

  useEffect(() => {
    setIsImageLoading(true);
  }, [photo, setIsImageLoading]);

  const setImageLoaded = () => setIsImageLoading(false);

  return !isLoading ? (
    (photo && (
      <ParticipantPhotoWrapperElement>
        <PhotoWrapperElement>
          <ArrowLeftIconElement width="6%" height="6%" />

          <ArrowRightLinkElement to="/nextPhoto">
            <OverlayTrigger overlay={<Tooltip>Перейти к неоцененной фотографии</Tooltip>}>
              <ArrowRightIcon width="100%" height="100%" />
            </OverlayTrigger>
          </ArrowRightLinkElement>

          <Link
            to={`/photos/full-view/${nominationId}/${participantId}/${photo.link.replace(
              'https://drive.google.com/uc?id=',
              '',
            )}`}
          >
            <img src={getFullImage(photo.link)} alt="Фото номинации" onLoad={setImageLoaded}></img>
          </Link>
        </PhotoWrapperElement>
        <PhotoInfoBlockElement>
          <h3>{nominationName}</h3>
          <p className="text-muted">Участник {photo.name}</p>
          <MarksWrapperElement>
            <h4>Оценки:</h4>
            <span>Идея:</span>
            <StarsWrapperElement>
              {marks.map((mark) => getMarkStar(mark, idea, 'idea', () => setMarks(mark, 'idea')))}
              <MarkLabelElement className="text-muted">{idea}</MarkLabelElement>
            </StarsWrapperElement>
            <span>Исполнение:</span>
            <StarsWrapperElement>
              {marks.map((mark) => getMarkStar(mark, look, 'look', () => setMarks(mark, 'look')))}
              <MarkLabelElement className="text-muted">{look}</MarkLabelElement>
            </StarsWrapperElement>
            <span className="text-muted">Cредняя оценка - {(look + idea) / 2}</span>
          </MarksWrapperElement>
          <Button as={Link} variant="dark" to={`/participants/${participantId}`}>
            Профиль участника
          </Button>
          <Button as={Link} variant="dark" to={`/nominations/${nominationId}`}>
            Профиль номинации
          </Button>
        </PhotoInfoBlockElement>
      </ParticipantPhotoWrapperElement>
    )) || <h3>Фото не найдено</h3>
  ) : (
    <Loader />
  );
};

ParticipantPhoto.propTypes = {
  participantId: PropTypes.string.isRequired,
  nominationId: PropTypes.string.isRequired,
  photo: photoPropType,
  nominationName: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  mark: PropTypes.shape({
    idea: PropTypes.number,
    look: PropTypes.number,
  }),
  onMarkChange: PropTypes.func.isRequired,
};
