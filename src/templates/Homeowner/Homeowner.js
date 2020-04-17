import React, { useReducer } from 'react';
import { graphql } from 'gatsby';
import Layout from '../../components/layout';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Typography,
  Fab,
} from '@material-ui/core';
import theme from '../../theme';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Project from '../Project/project';

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
    fontFamily: theme.fonts.nuni,
  },
  h3: {
    padding: 0,
    margin: 0,
    fontFamily: theme.fonts.pop,
  },
  projectWrap: {
    margin: 50,
  },
  buttonText: {
    fontSize: 15,
    color: theme.color.drkGrey,
    fontFamily: theme.fonts.karl,
    padding: 10,
  },
};

const Homeowner = props => {
  const [state, updateState] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      contractIsOpen: false,
    },
  );

  const openContract = () => {
    alert('open contract');
    updateState({
      contractIsOpen: !contractIsOpen,
    });
  };

  const { contractIsOpen } = state;
  const client = props.data.clients;
  console.log(props, 'props');
  const classes = props.classes;
  return (
    <>
      <Layout>
        <Table className={classes.table}>
          <TableHead>
            <TableRow className={classes.header}>
              <TableCell className={classes.cell}>
                {' '}
                <h3 className={classes.h3}>Name</h3>
              </TableCell>
              <TableCell className={classes.cell}>
                <h3 className={classes.h3}> Email</h3>
              </TableCell>
              <TableCell className={classes.cell}>
                <h3 className={classes.h3}> Call</h3>
                {/* must create link to make a clall to this phone number */}
              </TableCell>
              <TableCell className={classes.cell}>
                <h3 className={classes.h3}>Directions</h3>
                {/* Must create link to maps from this address */}
              </TableCell>
              <TableCell className={classes.cell}>
                <h3 className={classes.h3}>Rep</h3>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.cell2}>
                <div>
                  {client.firstName} {client.lastName}
                </div>
              </TableCell>
              <TableCell className={classes.cell2}>
                <div>{client.email}</div>
              </TableCell>
              <TableCell className={classes.cell2}>
                <div>{client.phone}</div>
              </TableCell>
              <TableCell className={classes.cell2}>
                <div>
                  {client.addressLine1} {` `}
                  {client.addressLine2}
                </div>
                <div>
                  {client.city} {client.state}, {client.zip}
                </div>
              </TableCell>
              <TableCell className={classes.cell2}>
                {client.rep}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className={classes.projectWrap}>
          {!contractIsOpen ? (
            <Fab variant="extended" onClick={openContract}>
              {' '}
              <AddCircleIcon />
              <Typography
                componant="p"
                className={classes.buttonText}
              >
                Start Application
              </Typography>
            </Fab>
          ) : (
            <>
              <Project />
              <Fab onClick={openContract}> Close Application</Fab>
            </>
          )}
        </div>
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
