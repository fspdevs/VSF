import React, { useState } from 'react';
import { Link } from 'gatsby';
import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import SignOutDrawer from '../SignOutDrawer';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import HomeIcon from '@material-ui/icons/Home';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PersonIcon from '@material-ui/icons/Person';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase/index';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  CssBaseline,
} from '@material-ui/core';
import {
  Menu as MenuIcon,
  ChevronLeft as ChevronLeftIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Person,
} from '@material-ui/icons';

import classNames from 'classnames';

const drawerWidth = 240;

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    //  '.MuiTableCell-root'

    '.MuiButton-label': {
      textDecoration: 'none',
    },
    '*, *::before, *::after': {
      textDecoration: 'none',
    },
    '.MuiListItemText-primary': {
      color: 'white',
      fontSize: '26px',
    },
    // '.MuiListItem-root :hover': {
    //   color: '#333333',
    // },
    '.MuiDrawer-paper': {
      // background: '#428aca',
      background: '#FAA818',
    },
    '.MuiListItem-root:hover': {
      // background: '#333333',
      opacity: '.6',
    },
    '.MuiListItem-root:active': {
      // background: '#333333',
      color: 'pink',
    },
    '.MuiListItemIcon-root': {
      color: 'white',
    },
  },
})(() => null);

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: '#383838',
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
    fontSize: 40,
  },
  drawerPaper: {
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  drawer: {
    height: '100vh',
  },
});
const Navigation = styles => {
  const [drawerOpen, setDrawer] = useState(true);
  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  const handleDrawerClose = () => {
    setDrawer(false);
  };
  const { classes } = styles;

  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <NavigationAuth
            authUser={authUser}
            classes={classes}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerOpen={drawerOpen}
          />
        ) : (
          <NavigationNonAuth
            classes={classes}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
            drawerOpen={drawerOpen}
          />
        )
      }
    </AuthUserContext.Consumer>
  );
};

const NavigationAuth = ({
  authUser,
  classes,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
  firebase,
}) => {
  return (
    <>
      <GlobalCss />
      {console.log(authUser, 'authUser!')}
      {console.log(firebase, 'firebase')}
      <CssBaseline />
      <AppBar
        position="absolute"
        className={classNames(
          classes.appBar,
          drawerOpen && classes.appBarShift,
        )}
      >
        <Toolbar
          disableGutters={drawerOpen}
          className={classes.toolbar}
        >
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classNames(
              classes.menuButton,
              drawerOpen && classes.menuButtonHidden,
            )}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            component="h2"
            variant="h2"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Vision Solar Finance
          </Typography>
          <SignOutButton />
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: classNames(
            classes.drawerPaper,
            !drawerOpen && classes.drawerPaperClose,
            classes.drawer,
          ),
        }}
        open={drawerOpen}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>

        <List>
          <div>
            <Link
              to={ROUTES.HOME}
              activeStyle={{ background: 'red' }}
            >
              <ListItem>
                <ListItemIcon>
                  <HomeIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>

            <Link to={ROUTES.ACCOUNT}>
              <ListItem>
                <ListItemIcon>
                  <AccountCircleIcon fontSize="large" />
                </ListItemIcon>
                <ListItemText primary=" My Account" />
              </ListItem>
            </Link>

            {!!authUser.roles[ROLES.ADMIN] && (
              <Link to={ROUTES.ADMIN}>
                <ListItem>
                  <ListItemIcon>
                    <SupervisorAccountIcon fontSize="large" />
                  </ListItemIcon>
                  <ListItemText primary="Admin" />
                </ListItem>
              </Link>
            )}
            <Link to={ROUTES.LANDING}>
              <ListItem>
                <ListItemIcon>
                  {/* <DashboardIcon /> */}
                  <ExitToAppIcon fontSize="large" />
                </ListItemIcon>
                {/* <SignOutButton /> */}
                <SignOutDrawer />
                {/* <ListItemText primary="Sign Out"  onClick={firebase ? firebase.doSignOut : () => {}}/>
                 */}
              </ListItem>
            </Link>
          </div>
        </List>
      </Drawer>
    </>
  );
};
const NavigationNonAuth = ({
  classes,
  handleDrawerOpen,
  handleDrawerClose,
  drawerOpen,
}) => (
  <>
    <GlobalCss />
    <Drawer
      variant="permanent"
      classes={{
        paper: classNames(
          classes.drawerPaper,
          !drawerOpen && classes.drawerPaperClose,
        ),
      }}
      open={drawerOpen}
    >
      <div className={classes.toolbarIcon}>
        <IconButton
          onClick={drawerOpen ? handleDrawerClose : handleDrawerOpen}
        >
          {drawerOpen && <ChevronLeftIcon />}
          {!drawerOpen && <MenuIcon />}
        </IconButton>
      </div>

      <List>
        <div>
          {/* <Link to={ROUTES.LANDING}>
            <ListItem>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Landing" />
            </ListItem>
          </Link> */}
          <Link to={ROUTES.SIGN_IN}>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon fontSize="large" />
                {/* <DashboardIcon /> */}
              </ListItemIcon>
              <ListItemText primary="Sign In" />
            </ListItem>
          </Link>
          <Link to={ROUTES.SIGN_UP}>
            <ListItem>
              <ListItemIcon>
                {/* <DashboardIcon /> */}
                <PersonIcon fontSize="large" />
              </ListItemIcon>
              <ListItemText primary="Sign Up" />
            </ListItem>
          </Link>
        </div>
      </List>
    </Drawer>
  </>
);

export default withStyles(styles)(withFirebase(Navigation));
