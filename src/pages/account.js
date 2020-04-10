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
import { styled, withStyles } from '@material-ui/core/styles';
import {
  Box,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
} from '@material-ui/core';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

const styles = {
  expanded: {
    margin: 10,
  },
};
const AccountPageBase = props => {
  const { classes } = props;
  return (
    <>
      <AuthUserContext.Consumer>
        {authUser => (
          <Column>
            <RepEmail component="h3">
              Email: {authUser.email}
            </RepEmail>
            <RepEmail component="h3">
              Name: {authUser.username}
            </RepEmail>
            <RepEmail component="h3">
              Role: {authUser.roles.ADMIN}
              {/* Must make roles just a string and not a object */}
            </RepEmail>
            <RepEmail component="h3">ID: {authUser.uid}</RepEmail>

            <ExpansionPanel className={classes.expanded}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h3">
                  I Forgot My Password
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Column>
                  <PasswordForgetForm />
                </Column>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            {/* <h3>Role: {authUser.roles}</h3> */}

            <ExpansionPanel className={classes.expanded}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h3">
                  I Want To Change My Password
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Column>
                  <PasswordChangeForm />
                </Column>
              </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel className={classes.expanded}>
              <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography component="h3">
                  Login Management
                </Typography>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <LoginManagement authUser={authUser} />
              </ExpansionPanelDetails>
            </ExpansionPanel>
            {/* Deacitvate Password is only active if you link you Google account */}
          </Column>
        )}
      </AuthUserContext.Consumer>
    </>
  );
};

const condition = authUser => !!authUser;

const AccountPage = compose(
  withEmailVerification,
  withAuthorization(condition),
)(withStyles(styles)(AccountPageBase));

export default () => (
  <Layout>
    <AccountPage />
  </Layout>
);
