import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withStyles } from '@material-ui/core/styles';
import { TextField, Fab, Button, Box } from '@material-ui/core';
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
};
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
      loading: false,
      createClient: false,
      clients: [],
      limit: 5,
      _initFirebase: false,
    };
  }

  firebaseInit() {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
      console.log('firebaseInit is hitting', this._initFirebase);
      this.onListenForClients();
    }
  }

  componentDidMount() {
    this.firebaseInit();
  }

  componentDidUpdate() {
    this.firebaseInit();
  }

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
      userId: authUser.uid,
      rep: authUser.username,
      createdAt: this.props.firebase.serverValue.TIMESTAMP,
    });
    this.setState({
      createClient: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
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
      editedAt: this.props.firebase.serverValue.TIMESTAMP,
    });
  };

  onRemoveClient = uid => {
    this.props.firebase.client(uid).remove();
  };

  render() {
    const {
      firstName,
      lastName,
      email,
      phone,
      loading,
      createClient,
      clients,
      limit,
      _initFirebase,
    } = this.state;
    return (
      //! Make sure you change the functions to align with the class based component
      <AuthUserContext.Consumer>
        {authUser => (
          <div>
            {' '}
            {clients && (
              <ClientList
                clients={clients}
                authUser={authUser}
                onEditClient={this.onEditClient}
                onRemoveClient={this.onRemoveClient}
              />
            )}
            {!clients && (
              <Box component="div">There Are No Clients in DB</Box>
            )}
            {!this.state.createClient && (
              <Fab variant="extended" onClick={this.makeClient}>
                <Add />
                Create Client
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
                <Button type="submit" startIcon={<Save />}>
                  Add User
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
          </div>
        )}
      </AuthUserContext.Consumer>
    );
  }
}

export default withStyles(styles)(withFirebase(Clients));
