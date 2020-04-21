import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';
import theme from '../theme';

const SignUpPage = () => (
  <>
    <Typography
      variant="h2"
      style={{
        fontFamily: theme.fonts.pop,
        fontWeight: '700',
        color: theme.color.soulOrange,
      }}
    >
      Sign Up
    </Typography>
    <SignUpForm />
  </>
);

export default () => (
  <Layout>
    <SignUpPage />
  </Layout>
);
