import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withStyles } from '@material-ui/core/styles';
import {
  TextField,
  Fab,
  Button,
  Box,
  Grid,
  Typography,
  Snackbar,
  Select,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { Add, Save, Cancel } from '@material-ui/icons';
import ClientList from './ClientList';

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
  gridInput: {
    width: '100%',
    margin: 5,
  },
  fab: {
    marginTop: 20,
  },
  select: {
    width: '30%',
    alignSelf: 'center',
    marginTop: 20,
  },
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
// ! keep in mind that the Firebase object and session is in the props object along with the MAterial UI styles (as classes) This Firebase "prop" is accessible in each component.

class Clients extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);
    this.state = {
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
      rep: '',
      loading: false,
      createClient: false,
      clients: [],
      users: [],
      limit: 5,
      _initFirebase: false,
      openSuccessSnack: false,
      openDeleteSnack: false,
    };
  }

  firebaseInit() {
    //function to accecc th ereps in the database
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
      console.log('firebaseInit is hitting', this._initFirebase);
      this.onListenForClients();
      this.onListenForUsers();
    }
  }

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

  onListenForUsers = () => {
    this.setState({ loading: true });
    this.props.firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key,
      }));
      this.setState({
        users: usersList,
        loading: false,
      });
    });
  };
  onListenForClients = () => {
    this.setState({ loading: true });
    this.props.firebase
      .clients()
      .orderByChild('createdAt')
      .limitToLast(this.state.limit)
      .on('value', snapshot => {
        const clientObject = snapshot.val();
        if (clientObject) {
          const clientList = Object.keys(clientObject).map(key => ({
            ...clientObject[key],
            uid: key,
          }));
          this.setState({
            clients: clientList,
            loading: false,
          });
          console.log(this.state.clients, 'clients');
        } else {
          this.setState({ clients: null, loading: false });
          console.log('No clients in DB');
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.clients().off();
  }

  //////////////////////////////////////////////////
  //! //////MEssage creation/editing functions/////
  ////////////////////////////////////////////////

  //This funciton opens up the form to upload a client's info and closes the form
  makeClient = () => {
    console.log('hitting');
    !this.state.createClient
      ? this.setState({ createClient: true })
      : this.setState({ createClient: false });
  };

  //Handler for onChange for each input
  onChangeHandler = e => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  //Function for adding client to firebase database
  uploadClient = (e, authUser) => {
    this.props.firebase.clients().push({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      phone: this.state.phone,
      addressLine1: this.state.addressLine1,
      addressLine2: this.state.addressLine2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
      country: this.state.country,
      userId: authUser.uid,
      // rep: authUser.username, //! Rep is chosen via dropdown instead of by who is currently logged in
      rep: this.state.rep,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.setState({
      createClient: false,
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
      rep: '',
    });
    this.handleSuccessSnackBar();
    console.log(this.state.clients, 'clients array');
    console.log('it works');
    e.preventDefault();
  };

  onEditClient = (client, clientInfo) => {
    const { uid, ...clientSnapshot } = client;
    this.props.firebase.client(client.uid).update({
      ...clientSnapshot,
      firstName: clientInfo.firstName,
      lastName: clientInfo.lastName,
      email: clientInfo.email,
      phone: clientInfo.phone,
      addressLine1: clientInfo.addressLine1,
      addressLine2: clientInfo.addressLine2,
      city: clientInfo.city,
      state: clientInfo.state,
      zip: clientInfo.zip,
      country: clientInfo.country,
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveClient = uid => {
    this.props.firebase.client(uid).remove();
    this.handleDeleteSnackBar();
  };

  handleSuccessSnackBar = e => {
    this.setState({
      openSuccessSnack: !this.state.openSuccessSnack,
    });
  };
  handleDeleteSnackBar = e => {
    this.setState({
      openDeleteSnack: !this.state.openDeleteSnack,
    });
  };

  render() {
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
      loading,
      rep,
      // createClient,
      clients,
      users,
      limit,
      _initFirebase,
    } = this.state;
    return (
      //! Make sure you change the functions to align with the class based component
      <AuthUserContext.Consumer>
        {authUser => (
          <>
            <Snackbar
              open={this.state.openSuccessSnack}
              name="openSuccessSnack"
              autoHideDuration={3000}
              onClose={this.handleSuccessSnackBar}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Alert
                onClose={this.handleSuccessSnackBar}
                severity="success"
              >
                Client Created Successfully!!!
              </Alert>
            </Snackbar>{' '}
            <Snackbar
              open={this.state.openDeleteSnack}
              name="openDeleteSnack"
              autoHideDuration={3000}
              onClose={this.handleDeleteSnackBar}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
            >
              <Alert
                onClose={this.handleDeleteSnackBar}
                severity="error"
              >
                <strong>
                  {' '}
                  {authUser.username} deleted a CLIENT !!!
                </strong>
              </Alert>
            </Snackbar>
            {/*  CLient Component  */}
            {clients && (
              <ClientList
                clients={clients}
                authUser={authUser}
                onEditClient={this.onEditClient}
                onRemoveClient={this.onRemoveClient}
              />
            )}
            {/*  CLient Component  */}
            {!clients && (
              <Box component="div">There Are No Clients in DB</Box>
            )}
            {loading && (
              <Typography component="h3">Loading .....</Typography>
            )}
            {!this.state.createClient && (
              <Fab
                variant="extended"
                onClick={this.makeClient}
                className={this.props.classes.fab}
              >
                <Add />
                Add Homeowner
              </Fab>
            )}
            {this.state.createClient && (
              <form
                className={this.props.classes.root}
                noValidate
                autoComplete="off"
                onSubmit={e => this.uploadClient(e, authUser)}
              >
                <TextField
                  name="firstName"
                  className={this.props.classes.input}
                  id="outlined-basic"
                  label="First Name"
                  variant="outlined"
                  type="text"
                  value={firstName}
                  onChange={this.onChangeHandler}
                />
                <TextField
                  name="lastName"
                  className={this.props.classes.input}
                  id="outlined-basic"
                  label="Last Name"
                  variant="outlined"
                  type="text"
                  value={lastName}
                  onChange={this.onChangeHandler}
                />
                <TextField
                  name="email"
                  className={this.props.classes.input}
                  id="outlined-basic"
                  label="Email"
                  variant="outlined"
                  type="email"
                  value={email}
                  onChange={this.onChangeHandler}
                />
                <TextField
                  name="phone"
                  className={this.props.classes.input}
                  id="outlined-basic"
                  label="Phone #"
                  variant="outlined"
                  type="text"
                  value={phone}
                  onChange={this.onChangeHandler}
                />
                <TextField
                  className={this.props.classes.input}
                  name="addressLine1"
                  id="outlined-basic"
                  label="Address Line 1"
                  variant="outlined"
                  type="text"
                  value={addressLine1}
                  onChange={this.onChangeHandler}
                />
                <TextField
                  className={this.props.classes.input}
                  name="addressLine2"
                  id="outlined-basic"
                  label="Address Line 2"
                  variant="outlined"
                  type="text"
                  value={addressLine2}
                  onChange={this.onChangeHandler}
                />
                <Grid container xs={12} justify="space-evenly">
                  <Grid item xs={5}>
                    <TextField
                      className={this.props.classes.gridInput}
                      name="city"
                      id="outlined-basic"
                      label="City"
                      variant="outlined"
                      type="text"
                      value={city}
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={this.props.classes.gridInput}
                      name="state"
                      id="outlined-basic"
                      label="State"
                      variant="outlined"
                      type="text"
                      value={state}
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                </Grid>
                <Grid container xs={12} justify="space-evenly">
                  <Grid item xs={5}>
                    <TextField
                      className={this.props.classes.gridInput}
                      name="zip"
                      id="outlined-basic"
                      label="Zip Code"
                      variant="outlined"
                      type="text"
                      value={zip}
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      className={this.props.classes.gridInput}
                      name="country"
                      id="outlined-basic"
                      label="Country"
                      variant="outlined"
                      type="text"
                      value={country}
                      onChange={this.onChangeHandler}
                    />
                  </Grid>
                </Grid>
                <FormControl
                  variant="standard"
                  className={this.props.classes.select}
                >
                  <Select
                    native
                    value={rep}
                    name="rep"
                    onChange={this.onChangeHandler}
                    inputProps={{
                      name: 'rep',
                    }}
                  >
                    {this.state.users.map(user => (
                      <option value={user.username}>
                        {user.username}
                      </option>
                    ))}
                  </Select>
                  <FormHelperText>Choose a Rep</FormHelperText>
                </FormControl>
                <Button type="submit" startIcon={<Save />}>
                  Add Homeowner
                </Button>
                <Button
                  type="submit"
                  startIcon={<Cancel />}
                  onClick={this.makeClient}
                >
                  Cancel
                </Button>
              </form>
            )}
          </>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withStyles(styles)(withFirebase(Clients));
