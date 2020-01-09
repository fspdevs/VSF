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
    <div>
      <TableHead>
        <TableRow>
          <TableCell key="firstName">
            <Tooltip
              title="sort??"
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
          <TableCell key="lastName">
            <Tooltip
              title="sort??"
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
          <TableCell key="email">
            <Tooltip
              title="sort??"
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
          <TableCell key="phone">
            <Tooltip
              title="sort??"
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
        </TableRow>
      </TableHead>
      <TableBody>
        {clients.map(client => (
          <TableRow key={client.uid}>
            <ClientItem
              authUser={authUser}
              client={client}
              onEditClient={onEditClient}
              onRemoveClient={onRemoveClient}
            />
          </TableRow>
        ))}
      </TableBody>
    </div>
  );
};

export default withStyles(styles)(ClientList);
