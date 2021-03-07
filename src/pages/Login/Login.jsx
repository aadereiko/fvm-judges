import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';
import { LoginWrapperElement, CardElement, FormElement } from './elements';

export const Login = ({ onClick }) => {
  const [username, setUsernme] = useState('');

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      onClick && onClick({ username });
    },
    [username, onClick],
  );

  return (
    <LoginWrapperElement>
      <h3>ФВМ.Жюри</h3>
      <CardElement body>
        <FormElement>
          <Form.Group>
            <Form.Label>Логин</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              onChange={(e) => setUsernme(e.target.value)}
            />
          </Form.Group>
          <Button variant="dark" type="submit" onClick={handleClick} disabled={!username}>
            Войти
          </Button>
        </FormElement>
      </CardElement>
    </LoginWrapperElement>
  );
};

Login.propTypes = {
  onClick: PropTypes.func.isRequired,
};
