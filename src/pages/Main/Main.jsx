import React from 'react';
import styled from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { APP_COLORS } from '../../shared';
import { HeaderContainer } from './Header';
import { ParticipantsContainer } from '../Participants';
import { ParticipantContainer } from '../Participant';
import { NominationsContainer } from '../Nominations';
import { NominationContainer } from '../Nomination';

const ContentElement = styled.div`
  background-color: ${APP_COLORS.SUPER_LIGHT_GRAY};
  min-height: calc(100% - 58px);
  width: 100%;
`;

const RouterWrapperElement = styled.div`
  width: 80%;
  margin-left: 10%;
  // look up why margin doesnt work
  padding-top: 30px;
`;

export const Main = () => {
  return (
    <>
      <Router>
        <HeaderContainer />
        <ContentElement>
          <RouterWrapperElement>
            <Switch>
              <Route path="/participants" exact component={ParticipantsContainer} />
              <Route path="/participants/:id" exact component={ParticipantContainer} />
              <Route path="/nominations" exact component={NominationsContainer} />
              <Route path="/nominations/:id" exact component={NominationContainer} />
            </Switch>
          </RouterWrapperElement>
        </ContentElement>
      </Router>
    </>
  );
};
