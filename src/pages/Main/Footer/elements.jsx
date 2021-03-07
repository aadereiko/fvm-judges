import { Navbar } from 'react-bootstrap';
import styled from 'styled-components';
import { APP_COLORS } from '../../../shared';
import { ReactComponent as TelegramIcon } from '../../../shared/assets/icons/telegram.svg';
import { ReactComponent as InstagramIcon } from '../../../shared/assets/icons/instagram.svg';

export const NavbarElement = styled(Navbar)`
  border-top: 1px solid ${APP_COLORS.LIGHT_BLUE_BORDER};

  .navbar-nav > a.nav-link {
    color: black;
  }
`;

export const TelegramIconElement = styled(TelegramIcon)`
  margin-right: 0.4rem;
`;

export const InstagramIconElement = styled(InstagramIcon)`
  margin-right: 0.4rem;
`;
