import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { DownloadButtonElement, DownloadIconElement, JudgeProfileWrapperElement } from './elements';
import { Button, Table } from 'react-bootstrap';
import { nominationPropType, participantPropType } from '../../shared/propTypes';
import { generateParticipantTableTds } from '../../shared/helpers/mark';
import { Loader } from '../../shared';

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

export const JudgeProfile = ({ name, username, marks, isLoading, nominations, participants }) => {
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
  }, [participants, nominations, marks]);

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

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, avgWs, 'Средние');
    XLSX.utils.book_append_sheet(wb, ideaWs, 'Идея');
    XLSX.utils.book_append_sheet(wb, lookWs, 'Реализация');

    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, `Оценки ${name}${fileExtension}`);
  }, [formatMarks]);

  return !isLoading ? (
    <JudgeProfileWrapperElement>
      <header>
        <h3>Жюри</h3>
        <h3>{name}</h3>
        <h4>логин: {username}</h4>
        <DownloadButtonElement variant="dark" onClick={exportToCSV}>
          <DownloadIconElement width="1.2rem" height="1.2rem" />
          Скачать оценки
        </DownloadButtonElement>
      </header>
      <h4 className="text-muted">Оценки: </h4>
      {marks && (
        <Table id="judge-table" hover bordered responsive striped size="sm">
          <thead>
            <tr>
              <th>Участник</th>
              {nominations.map((nomination) => (
                <th key={nomination.id}>{nomination.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>{generateParticipantTableTds(nominations, participants, marks)}</tbody>
        </Table>
      )}
    </JudgeProfileWrapperElement>
  ) : (
    <Loader />
  );
};

JudgeProfile.propTypes = {
  name: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  marks: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  participants: PropTypes.arrayOf(participantPropType).isRequired,
};
