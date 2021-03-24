import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { ManagementWrapperElement, ManagementHeaderElement, TrashElement } from './elements';
import { userPropType } from '../../shared/propTypes';
import { CreateUserForm } from './CreateUserForm';
import { Link } from 'react-router-dom';

export const Management = ({ users, onCreate, onDelete, isCreatingUser, isRemovingUser }) => {
  const [showModal, setShowModal] = useState(false);

  const closeModal = useCallback(() => {
    setShowModal(false);
  }, [setShowModal]);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, [setShowModal]);

  const handleCreate = useCallback(
    (userData) => {
      onCreate && onCreate(userData);
    },
    [onCreate],
  );

  const handleDelete = useCallback(
    (id) => () => {
      onDelete && onDelete(id);
    },
    [onDelete],
  );
  return (
    <>
      <ManagementWrapperElement>
        <ManagementHeaderElement>
          <h3>Управление</h3>
          <Button variant="dark" onClick={openModal}>
            Создать пользователя
          </Button>
        </ManagementHeaderElement>
        <h4 className="text-muted">Пользователи: </h4>
        {isRemovingUser ? (
          'Удаление пользователя...'
        ) : (
          <Table hover bordered responsive striped size="sm">
            <thead>
              <tr>
                <th>Имя</th>
                <th>Имя пользователя</th>
                <th>Роль</th>
                <th>Удалить</th>
                <th>Перейти</th>
              </tr>
            </thead>
            <tbody>
              {(users || []).map(
                (user) =>
                  user.username && (
                    <tr key={user.username}>
                      <td>{user.name}</td>
                      <td>{user.username}</td>
                      <td>{user.role === 'judge' ? 'Жюри' : 'Админ'}</td>
                      <td>
                        {user.role === 'judge' ? (
                          <TrashElement onClick={handleDelete(user._id)} />
                        ) : (
                          'Нельзя удалить'
                        )}
                      </td>
                      <td>
                        {user.role === 'judge' && (
                          <Link to={`management/${user._id}`}>Перейти</Link>
                        )}
                      </td>
                    </tr>
                  ),
              ) || null}
            </tbody>
          </Table>
        )}
      </ManagementWrapperElement>
      <CreateUserForm
        showModal={showModal}
        closeModal={closeModal}
        onCreate={handleCreate}
        isCreatingUser={isCreatingUser}
      />
    </>
  );
};

Management.propTypes = {
  users: PropTypes.arrayOf(userPropType),
  onCreate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isCreatingUser: PropTypes.bool.isRequired,
  isRemovingUser: PropTypes.bool.isRequired,
};
