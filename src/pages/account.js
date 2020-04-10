import React from 'react';
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
  Fab,
  Grid,
  Paper,
  TextField,
} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import theme from '../theme';

const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
});
const RepEmail = styled(Typography)({
  alignSelf: 'flex-start',
  fontFamily: `${theme.fonts.nuni}`,
  color: `${theme.color.cornBlue}`,
});

const styles = {
  title: {
    fontSize: 50,
    fontFamily: theme.fonts.nuni,
    margin: 30,
  },
  expanded: {
    margin: 10,
  },
  paper: {
    textAlign: 'center',
    color: theme.color.soulOrange,
  },
  grid: {
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
            <Typography componant="h1" className={classes.title}>
              My Account
            </Typography>
            <RepEmail component="h3">ID: {authUser.uid}</RepEmail>
            <Grid container spacing={3} className={classes.grid}>
              <Grid item xs={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  value={authUser.username}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  placeholder="Last Name"
                  // value={authUser.username}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={authUser.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Phone Number"
                  variant="outlined"
                  placeholder="Phone Number"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  id="outliend-basic"
                  label="Manager"
                  variant="outlined"
                  placeholder="Manager"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth={true}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  value={authUser.roles.ADMIN}
                />
              </Grid>
            </Grid>
            <Fab variant="extended">
              <SaveIcon />
              Save
            </Fab>

            <Row>
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
            </Row>
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
