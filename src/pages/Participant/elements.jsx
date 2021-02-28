import { Card } from 'react-bootstrap';
import styled from 'styled-components';

export const ParticipantWrapperElement = styled.div`
  width: 100%;
`;

export const ParticipantTitleElement = styled.span`
  font-size: 1.2rem;
  font-weight: 500;
`;

export const PhotosWrapperElement = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
`;

export const CardElement = styled(Card)`
  width: calc(30% - 30px);
  margin: 5px;
`;
