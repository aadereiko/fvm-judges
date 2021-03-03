import { Card, Form } from 'react-bootstrap';
import styled from 'styled-components';

export const LoginWrapperElement = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const CardElement = styled(Card)`
  width: 25rem;
  height: 12rem;
`;

export const FormElement = styled(Form)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .form-group {
    width: 90%;
  }

  .btn-dark {
    width: 7rem;
  }
`;
