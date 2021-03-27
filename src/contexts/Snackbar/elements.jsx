import styled, { keyframes } from 'styled-components';

const opacityKeyframe = keyframes`
  0% {
    opacity: 0;
  } 

  40%, 60% {
    opacity: 0.8;
  }

  100% {
    opacity: 0;
  }
`;

export const SnackbarWrapperElement = styled.div`
  min-width: 15rem;
  min-height: 3rem;
  background-color: black;
  opacity: 0.8;
  border-radius: 0.2rem;
  color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  animation: ${opacityKeyframe} 6s;
  cursor: pointer;
`;
