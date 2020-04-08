import React from 'react';

import { withFirebase } from '../Firebase';
import { ListItemText } from '@material-ui/core';

const SignOutDrawer = ({ firebase }) => (
    <ListItemText primary="Sign Out"  onClick={firebase ? firebase.doSignOut : () => {}}/>
    // {console.log(firebase, "firebase")}
//   <Button
//     color="inherit"
//     onClick={firebase ? firebase.doSignOut : () => {}}
//   >
//     {console.log(firebase, "firebase over hrer")}
//     Sign Out
//   </Button>

);
export default withFirebase(SignOutDrawer);
