import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Modal, Button, Form } from 'react-bootstrap';

const userInit = {
  username: '',
  name: '',
};

export const CreateUserForm = ({ showModal, closeModal, onCreate, isCreatingUser }) => {
  const [userForm, setUserForm] = useState(userInit);

  const handleFormChange = useCallback(
    (event) => {
      setUserForm((user) => ({
        ...user,
        [event.target.name]: event.target.value,
      }));
    },
    [setUserForm],
  );

  const handleCreate = useCallback(() => {
    if (userForm.name && userForm.username && !isCreatingUser) {
      onCreate(userForm);
    }
  }, [userForm, onCreate]);

  return (
    <Modal show={showModal} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>Создать пользователя</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formName">
            <Form.Label>Имя *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите имя"
              onChange={handleFormChange}
              name="name"
            />
            <Form.Text className="text-muted">Фамилия и имя</Form.Text>
          </Form.Group>

          <Form.Group controlId="formUsername">
            <Form.Label>Логин *</Form.Label>
            <Form.Control
              type="text"
              placeholder="Введите логин"
              onChange={handleFormChange}
              name="username"
            />

            <Form.Text className="text-muted">Используется для входа в систему </Form.Text>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Отменить
        </Button>
        <Button variant="primary" onClick={handleCreate} disabled={isCreatingUser}>
          {(isCreatingUser && 'Создание...') || 'Создать'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

CreateUserForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
  onCreate: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
  isCreatingUser: PropTypes.bool.isRequired,
};
