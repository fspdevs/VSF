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
        fontFamily: theme.fonts.nuni,
        color: theme.color.soulOrange,
      }}
    >
      Sign In
    </Typography>
    <SignInForm />
    <SignInGoogle />
    {/* <SignInFacebook />
    <SignInTwitter /> */}
    <PasswordForgetLink />
    <SignUpLink />
  </>
);

export default () => (
  <Layout>
    <SignInPage />
  </Layout>
);
