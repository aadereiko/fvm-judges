import styled from 'styled-components';
import { ReactComponent as StarIcon } from '../../shared/assets/icons/star.svg';
import { ReactComponent as StarFillIcon } from '../../shared/assets/icons/star-fill.svg';
import { ReactComponent as ArrowLeftIcon } from '../../shared/assets/icons/arrow-left-circle-fill.svg';
import { ReactComponent as ArrowRightIcon } from '../../shared/assets/icons/arrow-right-circle-fill.svg';

export const ParticipantPhotoWrapperElement = styled.div`
  display: flex;

  .btn-dark {
    width: 40%;
    min-width: 12rem;
    margin-top: 2rem;

    &:last-child {
      margin-top: 0.5rem;
    }
  }
`;

export const PhotoWrapperElement = styled.div`
  width: 50%;
  img {
    max-width: 100%;
  }
`;

export const PhotoInfoBlockElement = styled.div`
  width: 50%;
  padding-left: 5%;
  display: flex;
  flex-direction: column;
`;

export const StarsWrapperElement = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
`;

export const StarIconElement = styled(StarIcon)`
  cursor: pointer;
  margin-right: 0.4rem;
`;

export const StarFillIconElement = styled(StarFillIcon)`
  cursor: pointer;
  margin-right: 0.4rem;
`;

export const MarkLabelElement = styled.span`
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 0.5rem;
`;

export const MarksWrapperElement = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

export const ArrowLeftIconElement = styled(ArrowLeftIcon)`
  position: absolute;
  top: 50%;
  left: 1rem;
  cursor: pointer;
`;

export const ArrowRightIconElement = styled(ArrowRightIcon)`
  position: absolute;
  top: 50%;
  right: 1rem;
  cursor: pointer;
`;
