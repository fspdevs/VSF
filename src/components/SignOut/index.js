import React from 'react';

import { withFirebase } from '../Firebase';
import { Button } from '@material-ui/core';

const SignOutButton = ({ firebase }) => (
  <Button
    color="inherit"
    onClick={firebase ? firebase.doSignOut : () => {}}
  >
    {console.log(firebase, "firebase over hrer")}
    Sign Out
  </Button>

);
export default withFirebase(SignOutButton);
