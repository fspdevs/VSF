import React, { useReducer, useEffect } from 'react';
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
  const _initFirebase = false;

  const [state, updateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      loading: false,
      createClient: false,
      clients: [],
      limit: 10,
    },
  );

  const firebaseInit = () => {
    if (props.firebase && !_initFirebase) {
      _initFirebase = true;
      onListenForClients();
    }
  };

  useEffect(() => {
    firebaseInit();
  });

  useEffect(() => {
    if (props.firebase) {
      return () => {
        props.firebase.clients().off();
      };
    }
  }, []);

  const onListenForClients = () => {
    updateState({ loading: true });
    props.firebase
      .clients()
      .orderByChild('createdAt')
      .limitToLast(limit)
      .on('value', snapshot => {
        const clientObject = snapshot.val();
        if (clientObject) {
          const clientList = Object.keys(clientObject).map(key => ({
            ...clientObject[key],
            uid: key,
          }));
          updateState({
            clients: clientList,
            loading: false,
          });
        } else {
          updateState({ clients: null, loading: false });
        }
      });
  };

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
    clients,
    limit,
  } = state;
  return (
    <AuthUserContext.Consumer>
      {authUser => (
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
                value={firstName}
                onChange={e =>
                  updateState({ firstName: e.target.value })
                }
              />
              <TextField
                className={props.classes.input}
                id="outlined-basic"
                label="Last Name"
                variant="outlined"
                type="text"
                value={lastName}
                onChange={e =>
                  updateState({ lastName: e.target.value })
                }
              />
              <TextField
                className={props.classes.input}
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                value={email}
                onChange={e => updateState({ email: e.target.value })}
              />
              <TextField
                className={props.classes.input}
                id="outlined-basic"
                label="Phone #"
                variant="outlined"
                type="text"
                value={phone}
                onChange={e => updateState({ phone: e.target.value })}
              />
              <Button startIcon={<SaveIcon />} onClick={uploadClient}>
                Add User
              </Button>
              {/* For now this button just changes the state to hide form after submission, will need to create logic for adding clients to firebase DB */}
            </form>
          )}
          {firstName && <div>First Name: {firstName}</div>}
          {lastName && <div> Last Name: {lastName}</div>}
          {email && <div>Email: {email}</div>}
          {phone && <div>Phone Number: {phone}</div>}
        </>
      )}
    </AuthUserContext.Consumer>
  );
};

export default withStyles(styles)(Clients);
