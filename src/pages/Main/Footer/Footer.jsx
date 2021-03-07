import React from 'react';
import { Nav } from 'react-bootstrap';
import { InstagramIconElement, NavbarElement, TelegramIconElement } from './elements';

export const Footer = () => {
  return (
    <div>
      <NavbarElement className="justify-content-center" bg="gray">
        <Nav>
          <Nav.Link
            href="https://www.instagram.com/fotovelomarafon/"
            color="black"
            target="_blanked"
          >
            <InstagramIconElement />
            Instagram
          </Nav.Link>
          {/* <Nav.Link href="https://vk.com/foto_velo" target="_blanked">
            ВК
          </Nav.Link> */}
          <Nav.Link href="https://t.me/fotovelo" target="_blanked">
            <TelegramIconElement />
            Telegram
          </Nav.Link>
        </Nav>
      </NavbarElement>
    </div>
  );
};
