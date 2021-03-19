import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Nav, Navbar, DropdownButton, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavbarElement } from './elements';

export const Header = ({ name, onLogout }) => {
  return (
    <div>
      <NavbarElement bg="gray">
        <Navbar.Brand as={Link} to="/home">
          ФВМ.Жюри
        </Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/nominations">
            Номинации
          </Nav.Link>
          <Nav.Link as={Link} to="/participants">
            Участники
          </Nav.Link>
        </Nav>
        <Button
          // as={Link}
          // to={
          //   notMarked[0] ? `/photos/${notMarked[0].nomination}/${notMarked[0].notMarked[0]}` : '#'
          // }
          variant="dark"
          disabled
        >
          Оценивать
        </Button>
        <DropdownButton variant="light" title={name}>
          <Dropdown.Item onClick={onLogout}>Выйти</Dropdown.Item>
        </DropdownButton>
      </NavbarElement>
    </div>
  );
};

Header.propTypes = {
  name: PropTypes.string.isRequired,
  onLogout: PropTypes.func.isRequired,
  // notMarked: PropTypes.arrayOf(PropTypes.object),
};
