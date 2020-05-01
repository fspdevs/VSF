import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  Button,
  FormLabel,
} from '@material-ui/core';
////////////////////////////
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import theme from '../../theme';

const styles = {
  root: {
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    padding: 20,
    margin: '0 auto',
  },
  input: {
    margin: 5,
    textAlign: 'center',
    width: '60%',
    textAlign: 'center',
    padding: '5px 10px 5px 20px',
    '&:hover': {
      backgroundColor: theme.color.soulOrangeLight,
      opacity: '.7',
    },
  },
  group: {
    marginTop: 20,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: '20px',
    color: 'black',
  },
  helperText: {
    textAlign: 'center',
  },
  link: {
    color: 'pink',
  },
};

const INITIAL_STATE = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  manager: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  isRep: false,
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

const SignUpForm = styled(FormControl)({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 auto',
  width: 400,
});

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const {
      username,
      firstName,
      lastName,
      phone,
      manager,
      email,
      passwordOne,
      isAdmin,
      isRep,
    } = this.state;
    const role = '';

    if (isAdmin) {
      role = ROLES.ADMIN;
    }
    if (isRep) {
      role = ROLES.REP;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          firstName,
          lastName,
          phone,
          manager,
          role,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        navigate(ROUTES.HOME);
      })
      .catch(error => {
        if (error.code === ERROR_CODE_ACCOUNT_EXISTS) {
          error.message = ERROR_MSG_ACCOUNT_EXISTS;
        }

        this.setState({ error });
      })
      .then(() => {
        alert('Submission Went through');
      });

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      firstName,
      lastName,
      phone,
      manager,
      email,
      passwordOne,
      passwordTwo,
      isAdmin,
      isRep,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '' ||
      firstName === '';

    return (
      <>
        <form
          onSubmit={this.onSubmit}
          className={this.props.classes.form}
        >
          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Username"
          />
          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="firstName"
            value={firstName}
            onChange={this.onChange}
            type="text"
            placeholder="First Name"
          />
          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="lastName"
            value={lastName}
            onChange={this.onChange}
            type="text"
            placeholder="Last Name"
          />
          <TextField
            className={this.props.classes.input}
            autoComplete
            name="phone"
            value={phone}
            onChange={this.onChange}
            type="text"
            placeholder="Phone Number"
          />

          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <TextField
            className={this.props.classes.input}
            autoComplete
            name="manager"
            value={manager}
            onChange={this.onChange}
            type="text"
            placeholder="Who is you Manager?"
          />
          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <TextField
            className={this.props.classes.input}
            required="true"
            autoComplete
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <FormGroup className={this.props.classes.group}>
            <FormLabel
              component="legend"
              className={this.props.classes.formLabel}
            >
              Role:
            </FormLabel>
            <FormHelperText className={this.props.classes.helperText}>
              Choose One
            </FormHelperText>
            <FormControlLabel
              control={
                <Checkbox
                  // required="true"
                  autoComplete
                  name="isAdmin"
                  type="checkbox"
                  checked={isAdmin}
                  onChange={this.onChangeCheckbox}
                />
              }
              label="Admin"
            />
            <FormControlLabel
              control={
                <Checkbox
                  // required="true"
                  autoComplete
                  name="isRep"
                  type="checkbox"
                  checked={isRep}
                  onChange={this.onChangeCheckbox}
                />
              }
              label="Rep"
            />
          </FormGroup>

          <Button disabled={isInvalid} type="submit">
            Sign Up
          </Button>

          {error && <p>{error.message}</p>}
        </form>
        <div>
          <p style={{ color: '#21303A', fontFamily: 'Nunito Sans' }}>
            Already have an account?{' '}
            <Link
              to={ROUTES.SIGN_IN}
              style={{
                textDecoration: 'none',
                color: '#376B99',
                fontFamily: 'karla',
              }}
            >
              Sign In
            </Link>
          </p>
        </div>
      </>
    );
  }
}

const SignUpLink = () => (
  <p style={{ color: '#21303A', fontFamily: 'Nunito Sans' }}>
    Don't have an account?{' '}
    <Link
      to={ROUTES.SIGN_UP}
      style={{
        textDecoration: 'none',
        color: '#376B99',
        fontFamily: 'karla',
      }}
    >
      Sign Up
    </Link>
  </p>
);

export default withStyles(styles)(withFirebase(SignUpFormBase));

export { SignUpLink };
