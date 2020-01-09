import React, { useState, useReducer, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  ToolTip,
  TableSortLabel,
  Typography,
  TextField,
  Fab,
  Button,
  TableCell,
  Box,
} from '@material-ui/core';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: 400,
});

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
    width: '100%',
  },
};
const ClientItem = props => {
  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    editMode: false,
  };
  const [clientInfo, updateClientInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: props.client.firstName,
      lastName: props.client.lastName,
      email: props.client.email,
      phone: props.client.phone,
      editMode: false,
    },
  );

  useEffect(() => {
    console.log(props.client, 'client');
  }, [props.client]);

  const toggleEditMode = () => {
    updateClientInfo({
      editMode: !editMode,
    });
  };

  const onSaveEdit = () => {
    props.onEditClient(props.client, clientInfo);
    updateClientInfo({ initState });
  };

  const { firstName, lastName, email, phone, editMode } = clientInfo;
  const { client, authUser, onRemoveClient } = props;
  return (
    <>
      {authUser.uid === client.userId && (
        <div>
          {editMode ? (
            <Column>
              <TextField
                name="firstName"
                className={props.classes.input}
                id="outlined-basic"
                label={props.client.firstName}
                variant="outlined"
                type="text"
                value={firstName}
                onChange={e =>
                  updateClientInfo({ firstName: e.target.value })
                }
              />
              <TextField
                name="lastName"
                className={props.classes.input}
                id="outlined-basic"
                label={props.client.lastName}
                variant="outlined"
                type="text"
                value={lastName}
                onChange={e =>
                  updateClientInfo({ lastName: e.target.value })
                }
              />
              <TextField
                name="email"
                className={props.classes.input}
                id="outlined-basic"
                label={props.client.email}
                variant="outlined"
                type="email"
                value={email}
                onChange={e =>
                  updateClientInfo({ email: e.target.value })
                }
              />
              <TextField
                name="phone"
                className={props.classes.input}
                id="outlined-basic"
                label={props.client.phone}
                variant="outlined"
                type="text"
                value={phone}
                onChange={e =>
                  updateClientInfo({ phone: e.target.value })
                }
              />
            </Column>
          ) : (
            <div>
              <TableCell component="th" scope="row" >
                <strong>{client.firstName}</strong>
              </TableCell>

              <TableCell component="th" scope="row" >
                <strong>{client.lastName}</strong>
              </TableCell>

              <TableCell component="th" scope="row" >
                <strong>{client.email}</strong>
              </TableCell>

              <TableCell component="th" scope="row" >
                <strong>{client.phone}</strong>
              </TableCell>
            </div>
          )}

          <span>
            {editMode ? (
              <span>
                <button onClick={onSaveEdit}>Save</button>
                <button onClick={toggleEditMode}>Cancel</button>
              </span>
            ) : (
              <button onClick={toggleEditMode}>Edit</button>
            )}

            {!editMode && (
              <button
                type="button"
                onClick={() => onRemoveClient(client.uid)}
              >
                Delete
              </button>
            )}
          </span>
        </div>
      )}
    </>
  );
};
export default withStyles(styles)(ClientItem);
