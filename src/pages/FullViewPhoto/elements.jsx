import styled from 'styled-components';

export const FullViewPhotoWrapperElement = styled.div``;

export const OverlayElement = styled.div`
  position: fixed;
  overflow: auto;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1f1f1f;
  opacity: 1;

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 100;

  & > img {
    height: 90%;
  }

  & span {
    position: absolute;
    bottom: 1%;
    right: 50%;
    transform: translateX(50%);
    color: white;
  }
`;
