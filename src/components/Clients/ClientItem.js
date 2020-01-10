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
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
};
const ClientItem = props => {
  const initState = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
    editMode: false,
  };
  const [clientInfo, updateClientInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: props.client.firstName,
      lastName: props.client.lastName,
      email: props.client.email,
      phone: props.client.phone,
      addressLine1: props.client.addressLine1,
      addressLine2: props.client.addressLine2,
      city: props.client.city,
      state: props.client.state,
      zip: props.client.zip,
      country: props.client.country,
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
    toggleEditMode();
  };

  const {
    firstName,
    lastName,
    email,
    phone,
    addressLine1,
    addressLine2,
    city,
    state,
    zip,
    country,
    editMode,
  } = clientInfo;
  const { client, authUser, onRemoveClient } = props;
  return (
    <>
      {authUser.uid === client.userId && (
        <>
          <TableRow key={client.uid}>
            {editMode ? (
              <>
                <TableCell component="th" scope="row">
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
                </TableCell>
                <TableCell component="th" scope="row">
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
                </TableCell>
                <TableCell component="th" scope="row">
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
                </TableCell>
                <TableCell component="th" scope="row">
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
                </TableCell>
                <TableCell component="th" scope="row">
                  <TextField
                    name="addressLine1"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.addressLine1}
                    variant="outlined"
                    type="text"
                    value={addressLine1}
                    onChange={e =>
                      updateClientInfo({
                        addressLine1: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="addressLine2"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.addressLine2}
                    variant="outlined"
                    type="text"
                    value={addressLine2}
                    onChange={e =>
                      updateClientInfo({
                        addressLine2: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="city"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.city}
                    variant="outlined"
                    type="text"
                    value={city}
                    onChange={e =>
                      updateClientInfo({
                        city: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="state"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.state}
                    variant="outlined"
                    type="text"
                    value={state}
                    onChange={e =>
                      updateClientInfo({
                        state: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="zipcode"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.zipcode}
                    variant="outlined"
                    type="text"
                    value={zip}
                    onChange={e =>
                      updateClientInfo({
                        zip: e.target.value,
                      })
                    }
                  />
                  <TextField
                    name="country"
                    className={props.classes.input}
                    id="outlined-basic"
                    label={props.client.country}
                    variant="outlined"
                    type="text"
                    value={country}
                    onChange={e =>
                      updateClientInfo({
                        country: e.target.value,
                      })
                    }
                  />
                </TableCell>
              </>
            ) : (
              <>
                <TableCell align="center" component="th" scope="row">
                  <strong>{client.firstName}</strong>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <strong>{client.lastName}</strong>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <strong>{client.email}</strong>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <strong>{client.phone}</strong>
                </TableCell>
                <TableCell align="center" component="th" scope="row">
                  <Box component="div" className={props.classes.box}>
                    {client.addressLine1}
                    {` `}
                    {client.addressLine2}
                    {` `}
                    {client.city}
                    {` `}
                    {client.state}
                    {` `}
                    {client.country}
                    {` `}
                    {client.zip}
                  </Box>
                </TableCell>
              </>
            )}
            <TableCell align="center" component="th" scope="row">
              {' '}
              {editMode ? (
                <>
                  <button onClick={onSaveEdit}>Save</button>
                  <button onClick={toggleEditMode}>Cancel</button>
                </>
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
            </TableCell>
          </TableRow>
        </>
      )}
    </>
  );
};
export default withStyles(styles)(ClientItem);
