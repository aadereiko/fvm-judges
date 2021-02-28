import React from 'react';
import { Dropdown, Nav, Navbar, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { NavbarElement } from './elements';

export const Header = () => {
  return (
    <div>
      <NavbarElement bg="gray">
        <Navbar.Brand>ФВМ.Жюри</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/participants">
            Участники
          </Nav.Link>
          <Nav.Link as={Link} to="/nominations">
            Номинации
          </Nav.Link>
        </Nav>
        <DropdownButton variant="light" title="Иван Иванович">
          <Dropdown.Item>Выйти</Dropdown.Item>
        </DropdownButton>
      </NavbarElement>
    </div>
  );
};
