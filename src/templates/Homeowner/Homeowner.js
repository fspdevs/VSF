import React from 'react';
import { graphql } from 'gatsby';
import { withFirebase } from '../../components/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import PropTypes from 'prop-types';
import { styled } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  ToolTip,
  TableCell,
  TableSortLabel,
  Typography,
  TextField,
  Fab,
  Button,
  Grid,
  Box,
  Divider,
} from '@material-ui/core';

const GlobalCss = withStyles({
  // @global is handled by jss-plugin-global.
  '@global': {
    // You should target [class*="MuiButton-root"] instead if you nest themes.
    //  '.MuiTableCell-root'
    '.Layout-root-5': {
     padding: '0px',
    //  backgroundColor: 'pink',
    },
 
  },
})(() => null);

const styles = {
  input: {
    margin: 3,
    textAlign: 'center',
    width: '100%',
    background: '#faa818',
  },
  header: {
    backgroundColor: '#428ACA',
    color: 'white',
  },
  table: {
    margin: '0px',
  },
  cell: {
    color: 'white',
  }


};

const Homeowner =  props => {

  console.log(props, 'data');
  const client = props.data.clients;
  console.log(props, "props")
 
  return (
    <>
    <GlobalCss/>
      <Layout>
        <h1 className={props.classes.input}>Home Owner Component</h1>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow className={props.classes.header}>
              <TableCell className={props.classes.cell}> <h3>Name</h3></TableCell>
              <TableCell className={props.classes.cell}><h3> Email</h3></TableCell>
              <TableCell className={props.classes.cell}><h3>Address</h3></TableCell>
              <TableCell className={props.classes.cell}><h3>Rep</h3></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <div>{client.firstName} {client.lastName}</div>
              </TableCell>

              <TableCell><div>{client.email}</div></TableCell>
              <TableCell><div>{client.addressLine1}</div>
              <div>{client.addressLine2}</div>
              <div>{client.city}</div>
              <div>{client.state}, {client.zip}</div>
              {/* <h3>{client.country}</h3> */}
              </TableCell>
              <TableCell>{client.rep}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Layout>
    </>
  );
};

Homeowner.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Homeowner);

export const query = graphql`
  query($clientId: String!) {
    clients(id: { eq: $clientId }) {
      firstName
      lastName
      phone
      email
      addressLine1
      addressLine2
      city
      state
      zip
      country
      rep
      createdAt
      editedAt
      userId
    }
  }
`;
