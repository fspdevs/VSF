import React, { Component, useReducer, useState } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
const styles = {
  root: {
    backgroundColor: 'lightgrey',
    padding: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    margin: 5,
    textAlign: 'center',
  },
};

const Clients = props => {
  const [state, updateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      loading: false,
      createClient: false,
    },
  );

  const makeClient = () => {
    updateState({ createClient: true });
  };
  const uploadClient = () => {
    updateState({ createClient: false });
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    loading,
    createClient,
  } = state;
  return (
    <>
      {!createClient && (
        <Fab variant="extended" onClick={makeClient}>
          <AddIcon />
          Create Client
        </Fab>
      )}
      {createClient && (
        <form
          className={props.classes.root}
          noValidate
          autoComplete="off"
        >
          <TextField
            className={props.classes.input}
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            type="text"
          />
          <TextField
            className={props.classes.input}
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            type="text"
          />
          <TextField
            className={props.classes.input}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            type="email"
          />
          <TextField
            className={props.classes.input}
            id="outlined-basic"
            label="Phone #"
            variant="outlined"
            type="text"
          />
          <Button startIcon={<SaveIcon />} onClick={uploadClient}>
            Add User
          </Button>
          {/* For now this button just changes the state to hide form after submission, will need to create logic for adding clients to firebase DB */}
        </form>
      )}
    </>
  );
};

export default withStyles(styles)(Clients);
