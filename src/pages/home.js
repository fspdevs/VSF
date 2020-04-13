import React from 'react';
import { compose } from 'recompose';
import { styled } from '@material-ui/core/styles';
import Layout from '../components/layout';
import {
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
// import Messages from '../components/Messages';
import { Typography, Box, Container } from '@material-ui/core';
import Clients from '../components/Clients/Clients.js';

const DIV = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const H1 = styled(Typography)({
//  fontFamily: 'Nunito Sans',
 fontFamily: 'poppins',
 fontSize: '55px',
//  textTransform: 'uppercase',
color: '#428ACA',
 fontWeight: '700',
 
});

const Separator = styled(Box)({
  backgroundColor: 'red',
  margin: 100,
});
const HomePageBase = () => (
  <DIV>
    <H1>Home Page</H1>
    {/* <p>The Home Page is accessible by every signed in user.</p> */}
    {/* Chaange to a class based component  */}
    <Clients />
    <Separator>
      {/* <Messages /> 
      !reference for firebase logic
      */}
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
