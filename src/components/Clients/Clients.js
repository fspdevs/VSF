import React, { Component } from 'react';
import { AuthUserContext } from '../Session';
import { withFirebase } from '../Firebase';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { TextField, Fab, Button } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
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
//! keep in mind that the Firebase object and session is in the props object along with the MAterial UI styles (as classes) This Firebase "prop" is accessible in each component.

/////////////////////
/////////////////////
/////////////////////
/////////////////////

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
      // this.onListenForClients()
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
      .limitToLast(limit)
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
          console.log('clients not hitting');
        }
      });
  };

  componentWillUnmount() {
    this.props.firebase.clients().off();
  }

  //This funciton opens up the form to upload a client's info
  makeClient = () => {
    this.setState({ createClient: true });
  };

  uploadClient = (e, authUser) => {
    props.firebase.clients().push({
      firstName: firstName,
      lastName: lastName,
      email: email,
      phone: phone,
      userId: authUser.uid,
      createdAt: props.firebase.serverValue.TIMESTAMP,
    });
    this.setState({
      createClient: false,
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
    });
    console.log(clients, 'clients array');
    console.log('it works');
    e.preventDefault();
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
      <div>heyy</div>
      //! Make sure you change the functions to align with the class based component
      //     <AuthUserContext.Consumer>
      //       {authUser => (
      //         <>
      //           {/* <ClientList clients={clients} authUser={authUser} /> */}

      //           <Fab variant="extended" onClick={makeClient}>
      //             <AddIcon />
      //             Create Client
      //           </Fab>

      //           <form
      //             className={props.classes.root}
      //             noValidate
      //             autoComplete="off"
      //             onSubmit={e => uploadClient(e, authUser)}
      //           >
      //             <TextField
      //               className={props.classes.input}
      //               id="outlined-basic"
      //               label="First Name"
      //               variant="outlined"
      //               type="text"
      //               value={firstName}
      //               onChange={e =>
      //                 updateState({ firstName: e.target.value })
      //               }
      //             />
      //             <TextField
      //               className={props.classes.input}
      //               id="outlined-basic"
      //               label="Last Name"
      //               variant="outlined"
      //               type="text"
      //               value={lastName}
      //               onChange={e =>
      //                 updateState({ lastName: e.target.value })
      //               }
      //             />
      //             <TextField
      //               className={props.classes.input}
      //               id="outlined-basic"
      //               label="Email"
      //               variant="outlined"
      //               type="email"
      //               value={email}
      //               onChange={e => updateState({ email: e.target.value })}
      //             />
      //             <TextField
      //               className={props.classes.input}
      //               id="outlined-basic"
      //               label="Phone #"
      //               variant="outlined"
      //               type="text"
      //               value={phone}
      //               onChange={e => updateState({ phone: e.target.value })}
      //             />
      //             <Button type="submit" startIcon={<SaveIcon />}>
      //               Add User
      //             </Button>
      //           </form>
      //         </>
      //       )}
      //     </AuthUserContext.Consumer>
    );
  }
}

export default withStyles(styles)(withFirebase(Clients));

// const Clients = props => {
//   //Handling initFirebase which checks for firebase initilizaiton in the component then listens for clients in the database
//   // const [_initFirebase, set_initFirebase] = useState(false);
//   const [state, updateState] = useReducer(
//     (state, newState) => ({ ...state, ...newState }),
//     {
//       firstName: '',
//       lastName: '',
//       email: '',
//       phone: '',
//       loading: false,
//       createClient: false,
//       clients: [],
//       limit: 5,
//       _initFirebase: false,
//     },
//   );

//   const firebaseInit = () => {
//     if (props.firebase && !_initFirebase) {
//       updateState({ _initFirebase: true });
//       console.log('hittin', props);
//       onListenForClients();
//     }
//   };

//   useEffect(() => {
//     firebaseInit();
//   }, []);

//   useEffect(() => {
//     if (props.firebase) {
//       return () => {
//         props.firebase.clients().off();
//       };
//     }
//   });

//   const onListenForClients = () => {
//     console.log('hejsdfhlaskdjfhalksdjfhalskjh');
//     updateState({ loading: true });
//     props.firebase
//       .clients()
//       .orderByChild('createdAt')
//       .limitToLast(limit)
//       .on('value', snapshot => {
//         const clientObject = snapshot.val();
//         if (clientObject) {
//           const clientList = Object.keys(clientObject).map(key => ({
//             ...clientObject[key],
//             uid: key,
//           }));
//           updateState({
//             clients: clientList,
//             loading: false,
//           });
//           console.log(clients, 'clients hitting');
//         } else {
//           updateState({ clients: null, loading: false });
//           console.log('clients not hitting');
//         }
//       });
//   };

//   //This funciton opens up the form to upload a client's info
//   const makeClient = () => {
//     updateState({ createClient: true });
//   };
//   const uploadClient = (e, authUser) => {
//     props.firebase.clients().push({
//       firstName: firstName,
//       lastName: lastName,
//       email: email,
//       phone: phone,
//       userId: authUser.uid,
//       createdAt: props.firebase.serverValue.TIMESTAMP,
//     });
//     updateState({ createClient: false });
//     console.log(clients, 'clients array');
//     console.log('it works');
//     e.preventDefault();
//   };

//   const {
//     firstName,
//     lastName,
//     email,
//     phone,
//     loading,
//     createClient,
//     clients,
//     limit,
//     _initFirebase,
//   } = state;
//   return (
//     <AuthUserContext.Consumer>
//       {authUser => (
//         <>
//           {/* <ClientList clients={clients} authUser={authUser} /> */}

//           <Fab variant="extended" onClick={makeClient}>
//             <AddIcon />
//             Create Client
//           </Fab>

//           <form
//             className={props.classes.root}
//             noValidate
//             autoComplete="off"
//             onSubmit={e => uploadClient(e, authUser)}
//           >
//             <TextField
//               className={props.classes.input}
//               id="outlined-basic"
//               label="First Name"
//               variant="outlined"
//               type="text"
//               value={firstName}
//               onChange={e =>
//                 updateState({ firstName: e.target.value })
//               }
//             />
//             <TextField
//               className={props.classes.input}
//               id="outlined-basic"
//               label="Last Name"
//               variant="outlined"
//               type="text"
//               value={lastName}
//               onChange={e =>
//                 updateState({ lastName: e.target.value })
//               }
//             />
//             <TextField
//               className={props.classes.input}
//               id="outlined-basic"
//               label="Email"
//               variant="outlined"
//               type="email"
//               value={email}
//               onChange={e => updateState({ email: e.target.value })}
//             />
//             <TextField
//               className={props.classes.input}
//               id="outlined-basic"
//               label="Phone #"
//               variant="outlined"
//               type="text"
//               value={phone}
//               onChange={e => updateState({ phone: e.target.value })}
//             />
//             <Button type="submit" startIcon={<SaveIcon />}>
//               Add User
//             </Button>
//           </form>
//         </>
//       )}
//     </AuthUserContext.Consumer>
//   );
// };

// export default withStyles(styles)(withFirebase(Clients));
