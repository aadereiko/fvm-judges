import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { nominationPropType } from '../../shared/propTypes/nominations';
import { NominationsWrapperElement } from './elements';
import { ReactComponent as ArrowIcon } from '../../shared/assets/icons/arrow-down-right-circle.svg';
import { ReactComponent as CheckedIcon } from '../../shared/assets/icons/check-circle.svg';
import { ReactComponent as DashIcon } from '../../shared/assets/icons/dash-circle.svg';
import { Link } from 'react-router-dom';

export const Nominations = ({ nominations, isLoading }) => {
  return (
    <NominationsWrapperElement>
      <h3>Номинации</h3>
      {(isLoading && 'Загрузка...') || (
        <Table hover bordered responsive striped>
          <thead>
            <tr>
              <th>Название</th>
              <th>Оценено</th>
              <th>Всего</th>
              <th>Статус</th>
              <th>Перейти</th>
            </tr>
          </thead>
          <tbody>
            {nominations.map(({ name, id, photos }) => (
              <tr key={id}>
                <td>
                  <b>{name}</b>
                </td>
                <td>{id}</td>
                <td>{id}</td>
                <td>{id % 2 ? <DashIcon fill="red" /> : <CheckedIcon fill="green" />}</td>
                <td>
                  <Link to={`nominations/${id}`}>
                    <ArrowIcon fill="black" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </NominationsWrapperElement>
  );
};

Nominations.propTypes = {
  nominations: PropTypes.arrayOf(nominationPropType).isRequired,
  isLoading: PropTypes.bool.isRequired,
};
