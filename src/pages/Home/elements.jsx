import { Card, Button } from 'react-bootstrap';
import styled from 'styled-components';

export const HomeWrapperElement = styled.div``;

export const CardsWrapperElement = styled.div`
  display: flex;
`;

export const CardLeftElement = styled(Card)`
  max-height: 30rem;
  overflow-y: auto;
  margin-bottom: 1rem;
  width: 70%;
`;

export const CardRightElement = styled(Card)`
  overflow-y: hidden;
  margin-bottom: 1rem;
  width: 20%;
  margin-left: 2.5%;

  img {
    width: 90%;
    margin-left: 5%;
    margin-bottom: 5%;
  }

  & > span {
    margin-left: 5%;
    margin-top: 5%;
  }
`;

export const ButtonElement = styled(Button)`
  margin-left: auto;
`;
