import styled from 'styled-components';
import { ReactComponent as TrashIcon } from '../../shared/assets/icons/trash-fill.svg';
export const ManagementWrapperElement = styled.div``;

export const ManagementHeaderElement = styled.header`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

export const TrashElement = styled(TrashIcon)`
  cursor: pointer;
  &:hover {
    fill: gray;
  }
`;
