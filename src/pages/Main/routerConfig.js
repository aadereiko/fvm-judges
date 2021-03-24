import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { LoginContainer } from '../Login';
import { NominationsContainer } from '../Nominations';
import { NominationContainer } from '../Nomination';
import { ParticipantContainer } from '../Participant';
import { ParticipantPhotoContainer } from '../ParticipantPhoto';
import { ParticipantsContainer } from '../Participants';
import { Home } from '../Home';
import { ManagementContainer } from '../Management/ManagementContainer';
import { JudgeProfileContainer } from '../JudgeProfile/JudgeProfileContainer';

export const judgeRoutes = [
  { path: '/home', component: Home },
  { path: '/participants', component: ParticipantsContainer },
  { path: '/participants/:id', component: ParticipantContainer },
  { path: '/nominations', component: NominationsContainer },
  { path: '/nominations/:id', component: NominationContainer },
  { path: '/photos/:nominationId/:participantId', component: ParticipantPhotoContainer },
  { path: '/home', isRedirect: true },
];

export const adminRoutes = [
  { path: '/home', component: Home },
  { path: '/management/:id', component: JudgeProfileContainer },
  { path: '/management', component: ManagementContainer },
  { path: '/home', isRedirect: true },
];

export const notAuthRoutes = [
  { path: '/login', component: LoginContainer },
  { path: '/login', isRedirect: true },
];
const generateRoute = ({ path, component, isRedirect = false }) =>
  isRedirect ? (
    <Redirect from="*" key={`redirect-${path}`} to={path} />
  ) : (
    <Route path={path} key={path} exact component={component} />
  );

export const generateRoutes = (isAuth, role) => {
  if (isAuth === null) {
    return null;
  }

  if (!isAuth) {
    return notAuthRoutes.map((route) => generateRoute(route));
  }

  if (role === 'admin') {
    return adminRoutes.map((route) => generateRoute(route));
  }

  return judgeRoutes.map((route) => generateRoute(route));
};
