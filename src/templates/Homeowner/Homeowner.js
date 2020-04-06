import React from 'react';
import { graphql, Link } from 'gatsby';
// import { styled, makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import { withStyles } from '@material-ui/core/styles';
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
import theme from '../../theme';

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
    margin: 0,
    paddingTop: 5,
    paddingBottom: 5,
    textAlign: 'center',
  },
  cell2: {
    color: `${theme.color.drkGrey}`,
    margin: 5,
    padding: 5,
    textAlign: 'center',
  },
  h3: {
    padding: 0,
    margin: 0,
    fontFamily: `${theme.fonts.nuni}`,
  },
};

const Homeowner = props => {
  console.log(props, 'data');
  const client = props.data.clients;
  console.log(props, 'props');

  return (
    <>
      <GlobalCss />
      <Layout>
        <Table className={props.classes.table}>
          <TableHead>
            <TableRow className={props.classes.header}>
              <TableCell className={props.classes.cell}>
                {' '}
                <h3 className={props.classes.h3}>Name</h3>
              </TableCell>
              <TableCell className={props.classes.cell}>
                <h3 className={props.classes.h3}> Email</h3>
              </TableCell>
              <TableCell className={props.classes.cell}>
                <h3 className={props.classes.h3}> Call</h3>
                {/* must create link to make a clall to this phone number */}
              </TableCell>
              <TableCell className={props.classes.cell}>
                <h3 className={props.classes.h3}>Directions</h3>
                {/* Must create link to maps from this address */}
              </TableCell>
              <TableCell className={props.classes.cell}>
                <h3 className={props.classes.h3}>Rep</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={props.classes.cell2}>
                <div>
                  {client.firstName} {client.lastName}
                </div>
              </TableCell>
              <TableCell className={props.classes.cell2}>
                <div>{client.email}</div>
              </TableCell>
              <TableCell className={props.classes.cell2}>
                <div>{client.phone}</div>
              </TableCell>
              <TableCell className={props.classes.cell2}>
                <div>
                  {client.addressLine1} {` `}
                  {client.addressLine2}
                </div>
                <div>
                  {client.city} {client.state}, {client.zip}
                </div>
                {/* <h3>{client.country}</h3> */}
              </TableCell>
              <TableCell className={props.classes.cell2}>
                {client.rep}
              </TableCell>
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
      id
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
