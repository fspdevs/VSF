import React, { Fragment } from 'react';

import Layout from '../components/layout';
import SignUpForm from '../components/SignUp';

const SignUpPage = () => (
  <>
    <h1>SignUp</h1>
    <SignUpForm />
  </>
);

export default () => (
  <Layout>
    <SignUpPage />
  </Layout>
);
