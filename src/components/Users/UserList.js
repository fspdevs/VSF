import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { withStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tooltip,
  TableSortLabel,
  Typography,
} from '@material-ui/core';

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
    margin: 'auto',
  },
  table: {
    minWidth: 700,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    minWidth: 300,
  },
});

class UserList extends Component {
  _initFirebase = false;

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      users: [],
      order: 'asc',
      orderBy: 'name',
      page: 0,
      rowsPerPage: 10,
      usernameFilter: '',
    };
  }

  firebaseInit = () => {
    if (this.props.firebase && !this._initFirebase) {
      this._initFirebase = true;
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
    }
  };

  componentDidMount() {
    this.firebaseInit();
  }
  componentDidUpdate() {
    this.firebaseInit();
  }
  componentWillUnmount() {
    this.props.firebase.users().off();
  }

   // TODO:  Still need to implement sorting via these functions with Firebase functions
  // getFilter = () => {
  //   return this.state.usernameFilter.length > 0
  //     ? { name_contains: filterState.usernameFilter }
  //     : {};
  // };
  handleSortRequest = property => {
    const newOrderBy = property;
    let newOrder = 'desc';
    if (
      this.state.orderBy === property &&
      this.state.order === 'desc'
    ) {
      newOrder = 'asc';
    }
    this.setState({
      order: newOrder,
      orderBy: newOrderBy,
    });
  };
  render() {
    const { users, loading } = this.state;
    const { classes } = this.props;
    return (
      <>
        <div className={classes.root}>
          <Typography variant="h2" gutterBottom>
            Reps
          </Typography>
          {loading && <div>Loading ...</div>}
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell
                  key="name"
                  sortDirection={
                    this.state.orderBy === 'name'
                      ? this.state.order
                      : false
                  }
                >
                  <Tooltip
                    title="Sort"
                    placement="bottom-start"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.orderBy === 'name'}
                      direction={this.state.order}
                      onClick={() => this.handleSortRequest('name')}
                    >
                      Name
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell
                  key="email"
                  sortDirection={
                    this.state.orderBy === 'email'
                      ? this.state.order
                      : false
                  }
                >
                  <Tooltip
                    title="Sort"
                    placement="bottom-end"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.orderBy === 'email'}
                      direction={this.state.order}
                      onClick={() => this.handleSortRequest('email')}
                    >
                      Email
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
                <TableCell
                  key="uid"
                  sortDirection={
                    this.state.orderBy === 'uid'
                      ? this.state.order
                      : false
                  }
                >
                  <Tooltip
                    title="Sort"
                    placement="bottom-start"
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={this.state.orderBy === 'uid'}
                      direction={this.state.order}
                      onClick={() => this.handleSortRequest('uid')}
                    >
                      Username (Firebase uid)
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map(user => (
                <TableRow key={user.uid}>
                  <TableCell component="th" scope="row">
                    {user.username}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.email}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {user.uid}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </>
    );
  }
}

export default withStyles(styles)(withFirebase(UserList));
