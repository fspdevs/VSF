import React from 'react';
import { Typography } from '@material-ui/core';
import Layout from '../components/layout';
import SignInForm, {
  SignInGoogle,
  SignInFacebook,
  SignInTwitter,
} from '../components/SignIn';
import { SignUpLink } from '../components/SignUp';
import { PasswordForgetLink } from '../components/PasswordForget';
import theme from '../theme';

const SignInPage = () => (
  <>
    <Typography
      variant="h2"
      style={{
        // fontFamily: 'muli',
        fontFamily: theme.fonts.pop,
        fontWeight: '700',
        color: theme.color.soulOrange,
      }}
    >
      Sign In
    </Typography>
    <SignInForm />
    <SignInGoogle />
    <PasswordForgetLink />
    <SignUpLink />
  </>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
