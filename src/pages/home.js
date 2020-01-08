import React from 'react';
import { compose } from 'recompose';
import { styled } from '@material-ui/core/styles';
import Layout from '../components/layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import Messages from '../components/Messages';
import { Typography, Box } from '@material-ui/core';
import Clients from '../components/Clients/Clients.js';

const DIV = styled(Typography)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const Separator = styled(Box)({
  backgroundColor: 'red',
  margin: 100,
});
const HomePageBase = () => (
  <DIV component={'div'} variant="body1">
    <h1>Home Page</h1>
    <p>The Home Page is accessible by every signed in user.</p>
    {/* Chaange to a class based component  */}
    <Clients />
    <Separator>
      <Messages />
    </Separator>
  </DIV>
);

const condition = authUser => !!authUser;

const HomePage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(HomePageBase);

export default () => (
  <Layout>
    <HomePage />
  </Layout>
);
