import React, { Component } from 'react';
import { Link, navigate } from 'gatsby';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Container,
  Paper,
  Input,
  FormControl,
  FormGroup,
  FormControlLabel,
  FormHelperText,
  Checkbox,
  RadioGroup,
  Radio,
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
    paddingTop: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '60%',
    padding: 20,
    // boxShadow: '1px 2px 5px grey',
    margin: '0 auto',
    paddingBottom: '60px',
  },
  input: {
    margin: 5,
    textAlign: 'center',
    width: '80%',
    textAlign: 'center',
    padding: '5px 10px 5px 20px',
  },
  button: {
    color: 'white',
    // background: '#faa818',
    background: `${theme.color.cornBlue}`,
    boxShadow: "1px 2px 5px grey",
    padding: '13px',
    marginTop: '20px',
    width: '120px',
    fontFamily: `${theme.fonts.karl}`,
  },
  group: {
    marginTop: 20,
    textAlign: 'center',
  },
  formLabel: {
    fontSize: '20px',
    color: "black",
  },
  helperText: {
    textAlign: 'center',
  },
  link: {
    color: 'pink',
  }
};

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    //  '.MuiTableCell-root'
  
  
    '.MuiButtonBase-root.Mui-disabled': {
      color: 'white',
    },
  
    // '.MuiBox-root ': {
    //   backgroundColor: 'pink',
    // },
    '.MuiFab-extended': {
      background: `${theme.color.cornBlue}`,
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
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  isRep: false,
  error: null,
  role: 'none',
  errorRequired: false,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;

// let errorRequired = false;

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
    event.preventDefault();
    const {
      username,
      email,
      passwordOne,
      isAdmin,
      isRep,
      role,
      errorRequired,
    } = this.state;
    const roles = {};

    // const [value, setValue] = React.useState('none');

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }
    if (isRep) {
      roles[ROLES.REP] = ROLES.REP;
    } 

    
    if (isRep === true || isAdmin === true) {
      console.log("in submit firebase")
      this.setState({errorRequired: false});
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
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
      });

    event.preventDefault();

  } else {
    this.setState({ errorRequired: true });
    console.log( errorRequired,  "error")
    
   
  }
  };


 handleChange = (event) => {
  console.log(event.target, "event")
    this.setState({ role: event.target.value});
    if (event.target.value === 'isRep') {
      this.setState({ isRep: true });
    } else if (event.target.value === 'isAdmin') {
      this.setState({ isAdmin: true });
    }
  };

  onChange = event => {
    // console.log(event.target, "event")
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
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
      username === '';

    return (
      <>
      <GlobalCss/>
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
          placeholder="Full Name"
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
   
          <RadioGroup 
     name="role" aria-label="role" value={this.value} onChange={this.handleChange}>
          <div>
          <FormControlLabel
          value="isAdmin"
            control={
              <Radio
                // required="true"
                // autoComplete
                name="isAdmin"
                type="radio"
                color='primary'
                // checked={isAdmin}
               
                // onChange={this.onChangeCheckbox}
              />
            }
            label="Admin"
          />
          <FormControlLabel
          value="isRep"
            control={
              <Radio
                // required="true"
                // autoComplete
                // checkedIcon
                name="isRep"
                type="radio"
                color="primary"
                // checked={isRep}
                // onChange={this.onChangeCheckbox}
              />
            }
            label="Rep"
          />
             </div>
          </RadioGroup>
       
        </FormGroup>

        <Button disabled={isInvalid} type="submit"  className={this.props.classes.button}>
          Sign Up
        </Button>
            {/* {errorRequired !== "" ? <p>{errorRequired}</p> : null} */}
            <p style={this.state.errorRequired ? { 'display': "block"} : { 'display': "none"}}>You must choose a role</p>
            {console.log(this.state.errorRequired)}
        {error && <p>{error.message}</p>}
      </form>
      </>
    );
  }
}

const SignUpLink = () => (
  <p style={{'color': '#21303A', 'fontFamily': 'Nunito Sans'}}>
    
    Don't have an account? <Link to={ROUTES.SIGN_UP} style={{'textDecoration': 'none', 'color': '#376B99', 'fontFamily': 'karla'}}>Sign Up</Link>
  </p>
);

export default withStyles(styles)(withFirebase(SignUpFormBase));

export { SignUpLink };
