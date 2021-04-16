import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FlexColumnCenteredWrapperElement = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const LinkToPhotoElement = styled(Link)`
  text-decoration: none;
  color: black;
`;
