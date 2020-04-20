import React, { Component } from 'react';
import { navigate } from 'gatsby';
import { TextField, Fab, Button, Box } from '@material-ui/core';
//////////////////////////////////////
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { withStyles } from '@material-ui/core/styles';
import theme from '../../theme';
import PropTypes from 'prop-types';

const styles = {
  root: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    backgroundColor: theme.color.white,
    
    color: 'white',
    padding: 20,
    paddingBottom: '60px',

    // boxShadow: "1px 2px 5px grey",
  },
  input: {
    margin: 5,
    textAlign: 'center',
    textAlign: 'center',
    width: '80%',
    padding: '5px 10px 5px 20px',
    
  },
  fab: {
    margin: '10px 0px',
    fontSize: '12px',
    background: 'white',
    fontFamily: 'karla',
    border: '2px solid #428ACA',
    color: '#428ACA',
    marginBottom: '0px',
    boxShadow: '0px 2px 3px -1px rgba(0,0,0,0.2), 0px 2px 5px 0px rgba(0,0,0,0.14), 0px 1px 9px 0px rgba(0,0,0, 0.12)',
  },
  button: {
    color: 'white',
    // background: '#faa818',
    background: '#428ACA',
    boxShadow: "1px 2px 5px grey",
    padding: '13px',
    marginTop: '20px',
    width: '120px',
    fontFamily: `${theme.fonts.karl}`,
 
  }

};

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    //  '.MuiTableCell-root'
  
    '.Component-form-148': {
      background: 'pink',
    },
    '.MuiButtonBase-root.Mui-disabled': {
      color: 'white',
    },
    '.MuiButton-root Mui-disabled': {
      background: '#faa818',
      color: 'white',
    },
    '.Mui-disabled': {
      background: '#faa818',
      color: 'white',
    },
    // '.MuiBox-root ': {
    //   backgroundColor: 'pink',
    // },
    '.MuiFab-extended': {
      background: '#428ACA',
      color: 'white',
    },
   '.MuiInputBase-root': {
     fontSize: '20px',
     fontFamily: `${theme.fonts.nuni}`,
   },
   '.MuiPaper-root': {
    paddingBottom: '80px',
    paddingTop: '30px'
   },
 
  },
})(() => null);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS =
  'auth/account-exists-with-different-credential';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with an E-Mail address to
  this social account already exists. Try to login from
  this account instead and associate your social accounts on
  your personal account page.
`;

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <>
 <GlobalCss />
 {console.log(GlobalCss, "Global")}
      <Box component="div" className={this.props.classes.root}>
        <form
          onSubmit={this.onSubmit}
          className={this.props.classes.form}
        >
          <TextField
            className={this.props.classes.input}
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            className={this.props.classes.input}
            name="password"
            value={password}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <Button disabled={isInvalid}  className={this.props.classes.button} type="submit">
            Sign In
          </Button>

          {error && <p>{error.message}</p>}
        </form>
      </Box>
      </>
    );
  }
}

SignInFormBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

class SignInGoogleBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.user.displayName,
          email: socialAuthUser.user.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <>
      <GlobalCss/>
      <form onSubmit={this.onSubmit}>
        <Fab
          className={this.props.classes.fab}
          variant="extended"
          type="submit"
        >
          Sign In with Google
        </Fab>

        {error && <p>{error.message}</p>}
      </form>
      </>
    );
  }
}

class SignInFacebookBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithFacebook()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Fab
          className={this.props.classes.fab}
          variant="extended"
          type="submit"
        >
          Sign In with Facebook
        </Fab>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

class SignInTwitterBase extends Component {
  constructor(props) {
    super(props);

    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
      .doSignInWithTwitter()
      .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
        return this.props.firebase.user(socialAuthUser.user.uid).set({
          username: socialAuthUser.additionalUserInfo.profile.name,
          email: socialAuthUser.additionalUserInfo.profile.email,
          roles: {},
        });
      })
      .then(() => {
        this.setState({ error: null });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      });

    event.preventDefault();
  };

  render() {
    const { error } = this.state;

    return (
      <form onSubmit={this.onSubmit}>
        <Fab
          className={this.props.classes.fab}
          variant="extended"
          type="submit"
        >
          Sign In with Twitter
        </Fab>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = withStyles(styles)(withFirebase(SignInFormBase));

const SignInGoogle = withStyles(styles)(
  withFirebase(SignInGoogleBase),
);

const SignInFacebook = withStyles(styles)(
  withFirebase(SignInFacebookBase),
);

const SignInTwitter = withStyles(styles)(
  withFirebase(SignInTwitterBase),
);

export default SignInForm;

export { SignInGoogle, SignInFacebook, SignInTwitter };
