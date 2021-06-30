import styled from 'styled-components';

export const ManagementPraticipantsWrapperElement = styled.div``;

export const RegionTDElement = styled.td`
  color: ${(props) => (props.town ? '#5ab5a9' : 'black')};
`;

export const ParticipantPlacesWrapperElement = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;

  div {
    width: 90%;
  }
`;
