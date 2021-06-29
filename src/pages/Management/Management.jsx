import React, { useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Button, Table, Modal, Form } from 'react-bootstrap';
import { ManagementWrapperElement, ManagementHeaderElement, TrashElement } from './elements';
import { DownloadButtonElement, DownloadIconElement } from '../JudgeProfile/elements';
import { userPropType, nominationPropType, participantPropType } from '../../shared/propTypes';
import { CreateUserForm } from './CreateUserForm';
import { Link } from 'react-router-dom';

import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const handleFormatedMark = (formatedMarks, cb) => {
  if (!formatedMarks.length) {
    return [];
  }

  const keysToHandle = Object.keys(formatedMarks[0]).filter((field) => field !== ID_FIELD);
  return formatedMarks.map((mark) => {
    const handledMarks = keysToHandle.reduce(
      (res, field) => ({
        ...res,
        [field]: mark[field] ? cb(mark[field]) : 'Нет фото',
      }),
      {},
    );
    return {
      ...mark,
      ...handledMarks,
    };
  });
};
const ID_FIELD = 'Id участника';

export const Management = ({
  users,
  onCreate,
  onDelete,
  isCreatingUser,
  isRemovingUser,
  nominations,
  participants,
  marks,
}) => {
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

  const formatMarks = useCallback(() => {
    const formatedMarks = participants.map((participant) => {
      const participantMarks = nominations.reduce((res, nomination) => {
        const currentMark =
          (marks && marks[nomination.id] && marks[nomination.id][participant.id]) || null;
        return {
          ...res,
          [nomination.name]: currentMark,
        };
      }, {});

      return {
        [ID_FIELD]: participant.id,
        ...participantMarks,
      };
    });

    return formatedMarks;
  }, []);
  const exportToCSV = useCallback(() => {
    const formatedMarks = formatMarks();
    const fileType =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const avgMarks = handleFormatedMark(formatedMarks, (mark) => (mark.look + mark.idea) / 2);
    const ideaMarks = handleFormatedMark(formatedMarks, (mark) => mark.look);
    const lookMarks = handleFormatedMark(formatedMarks, (mark) => mark.idea);

    const avgWs = XLSX.utils.json_to_sheet(avgMarks);
    const ideaWs = XLSX.utils.json_to_sheet(ideaMarks);
    const lookWs = XLSX.utils.json_to_sheet(lookMarks);
    console.log(123, avgMarks);
    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, avgWs, 'Средние');
    XLSX.utils.book_append_sheet(wb, ideaWs, 'Идея');
    XLSX.utils.book_append_sheet(wb, lookWs, 'Реализация');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Оценки ${name}${fileExtension}`);
  }, [formatMarks]);

  console.log(users);
  return (
    <>
      <ManagementWrapperElement>
        <ManagementHeaderElement>
          <h3>Управление</h3>
          <Button variant="dark" onClick={openModal}>
            Создать пользователя
          </Button>
          <DownloadButtonElement variant="dark" onClick={exportToCSV}>
            <DownloadIconElement width="1.2rem" height="1.2rem" />
            Скачать оценки
          </DownloadButtonElement>
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
              </tr>
            </thead>
            <tbody>
              {(users || []).map(
                (user) =>
                  user.username && (
                    <tr key={user.username}>
                      <td>
                        {user.role === 'judge' ? (
                          <Link to={`management/${user._id}`}>{user.name}</Link>
                        ) : (
                          user.name
                        )}
                      </td>

                      <td>{user.username}</td>
                      <td>{user.role === 'judge' ? 'Жюри' : 'Админ'}</td>
                      <td>
                        {user.role === 'judge' ? (
                          <TrashElement onClick={handleDelete(user._id)} />
                        ) : (
                          'Нельзя удалить'
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
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
  marks: PropTypes.object.isRequired,
};
