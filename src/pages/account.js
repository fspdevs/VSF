import React, { Fragment } from 'react';
import { compose } from 'recompose';

import Layout from '../components/layout';
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from '../components/Session';
import PasswordForgetForm from '../components/PasswordForget';
import PasswordChangeForm from '../components/PasswordChange';
import LoginManagement from '../components/LoginManagement';
import { styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
import theme from '../theme';
const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const RepEmail = styled(Typography)({
  alignSelf: 'flex-start',
  fontFamily: `${theme.fonts.nuni}`,
  color: `${theme.color.cornBlue}`,
});

const AccountPageBase = () => (
  <Fragment>
    <AuthUserContext.Consumer>
      {authUser => (
        <Column>
          <RepEmail component="h3">Email: {authUser.email}</RepEmail>
          <RepEmail component="h3">
            Name: {authUser.username}
          </RepEmail>
          <RepEmail component="h3">
            Role: {authUser.roles.ADMIN}
            {/* Must make roles just a string and not a object */}
          </RepEmail>
          <RepEmail component="h3">ID: {authUser.uid}</RepEmail>
          {/* <h3>Role: {authUser.roles}</h3> */}
          <PasswordForgetForm />

          <PasswordChangeForm />
          <LoginManagement authUser={authUser} />
          {/* Deacitvate Password is only active if you link you Google account */}
        </Column>
      )}
    </AuthUserContext.Consumer>
  </Fragment>
);

const condition = authUser => !!authUser;

const AccountPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(AccountPageBase);

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);
