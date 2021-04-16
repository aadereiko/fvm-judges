import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { ReactComponent as DownloadIcon } from '../../shared/assets/icons/file-earmark-arrow-down.svg';
export const JudgeProfileWrapperElement = styled.div``;

export const DownloadIconElement = styled(DownloadIcon)`
  cursor: pointer;
  margin-right: 5px;
`;

export const DownloadButtonElement = styled(Button)`
  display: flex;
  margin-left: auto;
`;
