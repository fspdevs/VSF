import React from 'react';
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
  Toolbar,
} from '@material-ui/core';
import ClientItem from './ClientItem';
import { Link } from 'gatsby';

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

const ClientList = props => {
  const {
    clients,
    authUser,
    onEditClient,
    onRemoveClient,
    classes,
  } = props;
  return (
    <div className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center" key="firstName">
              <Tooltip
                title="First Name"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel
                // active={this.state.orderBy === 'firstName'}
                // direction={this.state.order}
                // onClick={() => this.handleSortRequest('firstName')}
                >
                  First Name
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="center" key="lastName">
              <Tooltip
                title="Last Name"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel
                // active={this.state.orderBy === 'lastName'}
                // direction={this.state.order}
                // onClick={() => this.handleSortRequest('lastName')}
                >
                  Last Name
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="center" key="email">
              <Tooltip
                title="Email"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel
                // active={this.state.orderBy === 'email'}
                // direction={this.state.order}
                // onClick={() => this.handleSortRequest('email')}
                >
                  Email
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="center" key="phone">
              <Tooltip
                title="Phone"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel
                // active={this.state.orderBy === 'phone'}
                // direction={this.state.order}
                // onClick={() => this.handleSortRequest('phone')}
                >
                  Phone
                </TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="center" key="address">
              <Tooltip
                title="Address"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel>Address</TableSortLabel>
              </Tooltip>
            </TableCell>
            <TableCell align="center" key="actions">
              <Tooltip
                title="Edit/Delete"
                placement="bottom-start"
                enterDelay={300}
              >
                <TableSortLabel>Actions</TableSortLabel>
              </Tooltip>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clients.map(client => (
            <ClientItem
              key={client.uid}
              authUser={authUser}
              client={client}
              onEditClient={onEditClient}
              onRemoveClient={onRemoveClient}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default withStyles(styles)(ClientList);
