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
  Grid,
  Box,
  Divider,
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { styled } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import PropTypes from 'prop-types';

const Column = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',

  width: 400,
});

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    //  '.MuiTableCell-root'
    '.MuiTableRow-head': {
      background: '#428ACA',
      color: 'white',
      width: '100%',
    },
    '.MuiDivider-root': {
      display: 'none',
    },
    '.MuiButton-label': {
      textDecoration: 'none',
    },
    '*, *::before, *::after': {
      textDecoration: 'none',
    },
    '.MuiTableSortLabel-root': {
      color: 'white',
    }
  },
})(() => null);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: 'black',
    color: 'color',
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

// const Field = styled(TableCell)({
//   color: 'pink',
//   maxWidth: 200,
//   wordWrap: 'break-word'
// })
const styles = {
  input: {
    margin: 3,

    textAlign: 'center',
    width: '100%',
    background: 'pink',
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
  },
  row: {
    // color: 'red',
    // '&:hover': {
    //   background: 'green',
    // },
  },
  cell: {
    maxWidth: 200,
    wordWrap: 'break-word',
  },
  head: {
    color: 'blue !important',
    color: 'white',
  },
  view: {
    color: 'black',
  },
  buttonWrap: {
    display: 'flex',
    flexDirection: 'row',
    height: '22px',
    color: '#428aca'
  },
  icon: {
    margin: '0 auto',
    padding: '3px',
  },
  iconWrap: {
    height: '100%',
    paddingTop: '2px',
  },
  buttonText: {
    height: '25px',
  },
  buttonDelete: {
    color: '#ff3300',
  }
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
      <GlobalCss />
      {console.log(props.classes, 'classes')}
      {console.log(authUser, 'authUser')}
      {/* {authUser.uid === client.userId && ( */}
      {(authUser.roles.ADMIN === 'ADMIN' ||
        props.client.rep === authUser.username) && (
        <>
          {/* <Link to={`/client/${client.uid}`}> */}
          <TableRow hover key={client.uid}>
            {editMode ? (
              <>
                <StyledTableCell
                  component="th"
                  scope="row"
                  className={props.classes.head}
                >
                  <TextField
                    name="firstName"
                    className={props.classes.head}
                    id="outlined-basic"
                    placeHolder={props.client.firstName}
                    label="First Name"
                    variant="outlined"
                    type="text"
                    value={firstName}
                    onChange={e =>
                      updateClientInfo({
                        firstName: e.target.value,
                      })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    scope="textField"
                    name="lastName"
                    className={props.classes.input}
                    id="outlined-basic"
                    placeHolder={props.client.lastName}
                    label="Last Name"
                    variant="outlined"
                    type="text"
                    value={lastName}
                    onChange={e =>
                      updateClientInfo({ lastName: e.target.value })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  <TextField
                    scope="textField"
                    name="email"
                    className={props.classes.input}
                    id="outlined-basic"
                    placeHolder={props.client.email}
                    label="Email"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={e =>
                      updateClientInfo({ email: e.target.value })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                
                >
                  <TextField
                    name="phone"
                    className={props.classes.input}
                    id="outlined-basic"
                    placeHolder={props.client.phone}
                    label="Phone"
                    variant="outlined"
                    type="text"
                    value={phone}
                    onChange={e =>
                      updateClientInfo({ phone: e.target.value })
                    }
                  />
                </StyledTableCell>
                <StyledTableCell
                  component="th"
                  scope="row"
                  scope="textField"
                >
                  <TextField
                    name="addressLine1"
                    className={props.classes.input}
                    id="outlined-basic"
                    placeHolder={props.client.addressLine1}
                    label="Address Line 1"
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
                    placeHolder={props.client.addressLine2}
                    label="Address Line 2"
                    variant="outlined"
                    type="text"
                    value={addressLine2}
                    onChange={e =>
                      updateClientInfo({
                        addressLine2: e.target.value,
                      })
                    }
                  />
                  <Grid container xs={12} justify="space-evenly">
                    <Grid item xs={6}>
                      <TextField
                        name="city"
                        className={props.classes.input}
                        className={props.classes.cell}
                        id="outlined-basic"
                        placeHolder={props.client.city}
                        label="City"
                        variant="outlined"
                        type="text"
                        value={city}
                        onChange={e =>
                          updateClientInfo({
                            city: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="state"
                        className={props.classes.input}
                        id="outlined-basic"
                        placeHolder={props.client.state}
                        label="State"
                        variant="outlined"
                        type="text"
                        value={state}
                        onChange={e =>
                          updateClientInfo({
                            state: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                  <Grid container xs={12} justify="space-evenly">
                    <Grid item xs={6}>
                      <TextField
                        name="zip"
                        className={props.classes.input}
                        id="outlined-basic"
                        placeHolder={props.client.zipcode}
                        label="Zip Code"
                        variant="outlined"
                        type="text"
                        value={zip}
                        onChange={e =>
                          updateClientInfo({
                            zip: e.target.value,
                          })
                        }
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        name="country"
                        className={props.classes.input}
                        id="outlined-basic"
                        placeHolder={props.client.country}
                        label="Country"
                        variant="outlined"
                        type="text"
                        value={country}
                        onChange={e =>
                          updateClientInfo({
                            country: e.target.value,
                          })
                        }
                      />
                    </Grid>
                  </Grid>
                </StyledTableCell>
              </>
            ) : (
              <>
                <TableCell align="center" component="th" scope="row">
                  <strong className={props.classes.row}>
                    {client.firstName}
                  </strong>
                </TableCell>

                <TableCell align="center" component="th" scope="row">
                  <strong>{client.lastName}</strong>
                </TableCell>

                <TableCell
                  align="center"
                  component="th"
                  scope="row"
                  className={props.classes.cell}
                >
                  <strong>{client.email}</strong>
                </TableCell>
                <Divider />

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
                  <Button onClick={onSaveEdit}>Save</Button>
                  <Button onClick={toggleEditMode}>Cancel</Button>
                </>
              ) : (
                <>
                  <Button>
                    <Link
                      to={`/client/${client.uid}`}
                      className={props.classes.view}
                    >
                      <div className={props.classes.buttonWrap}>
                        <div className={props.classes.iconWrap}>
                          <VisibilityIcon
                            fontSize="small"
                            className={props.classes.icon}
                          />
                        </div>
                        <div className={props.classes.buttonText}>View</div>
                      </div>
                    </Link>
                  </Button>
                  <Button onClick={toggleEditMode}>
                    <div className={props.classes.buttonWrap}>
                      <div className={props.classes.iconWrap}>
                        <EditIcon
                          fontSize="small"
                          className={props.classes.icon}
                        />
                      </div>
                      <div className={props.classes.buttonText}>Edit</div>
                    </div>
                  </Button>
                </>
              )}
              {!editMode && (
                <Button
                  type="button"
                  onClick={() => onRemoveClient(client.uid)}
                >
                  <div className={`${props.classes.buttonWrap} ${props.classes.buttonDelete}`}>
                      <div className={props.classes.iconWrap}>
                        <DeleteIcon
                          fontSize="small"
                          className={props.classes.icon}
                        />
                      </div>
                      <div className={`${props.classes.buttonText} `}>Delete</div>
                    </div>
                </Button>
              )}
            </TableCell>
          </TableRow>
          {/* </Link> */}
        </>
      )}
    </>
  );
};
ClientItem.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(ClientItem);
