import React, { Component } from 'react';
import { Link } from 'gatsby';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import { styled } from '@material-ui/core/styles';
import { TextField, Box, Button } from '@material-ui/core';

const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});
const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Column>
          <label>Forgot your password?</label>
          <TextField
            id="outlined-basic"
            label="Email Address"
            variant="outlined"
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            // placeholder="Email Address"
          />
          {/* <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          /> */}
          <Button
            variant="contained"
            disabled={isInvalid}
            type="submit"
          >
            Reset My Password
          </Button>
        </Column>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={ROUTES.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
);

export default withFirebase(PasswordForgetForm);

export { PasswordForgetLink };
