import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { styled } from '@material-ui/core/styles';
import { Box, Button, TextField } from '@material-ui/core';

const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: 50,
});

const PasswordChange = styled(TextField)({
  marginBottom: 10,
});
const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    const { passwordOne } = this.state;

    this.props.firebase
      .doPasswordUpdate(passwordOne)
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
    const { passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo || passwordOne === '';

    return (
      <form onSubmit={this.onSubmit}>
        <Column>
          <PasswordChange
            id="outlined-basic"
            variant="outlined"
            label="Change Your Password"
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="New Password"
          />
          <PasswordChange
            id="outlined-basic"
            variant="outlined"
            label="Confirm Password"
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm New Password"
          />
          <Button variant="outlined" disabled={isInvalid} type="submit">
            Reset My Password
          </Button>
        </Column>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withFirebase(PasswordChangeForm);
