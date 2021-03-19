import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import { APP_COLORS } from '../../shared';
import { HeaderContainer } from './Header';
import { generateRoutes } from './routerConfig';
import { useAuthState } from '../../contexts';
import { Footer } from './Footer/Footer';

const ContentElement = styled.main`
  background-color: ${APP_COLORS.SUPER_LIGHT_GRAY};
  min-height: calc(100% - 58px - 58px);
  width: 100%;
`;

const RouterWrapperElement = styled.div`
  width: 80%;
  margin-left: 10%;
  // look up why margin doesnt work
  padding-top: 30px;
  padding-bottom: 2px;
`;

export const Main = () => {
  const { isLoggedIn } = useAuthState();
  return (
    <Router>
      {isLoggedIn && <HeaderContainer />}
      <ContentElement>
        <RouterWrapperElement>
          <Switch>{generateRoutes(isLoggedIn)}</Switch>
        </RouterWrapperElement>
      </ContentElement>
      <div>{isLoggedIn}</div>
      {isLoggedIn && <Footer />}
    </Router>
  );
};
