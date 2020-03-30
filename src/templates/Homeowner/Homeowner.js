import React from 'react';
import { graphql } from 'gatsby';
import { styled, makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core';
import theme from '../../theme';

const Text = styled(Typography)({
  fontSize: 14,
  color: 'cornflowerblue',
  font: theme.fonts.nuni,
});

const useStyles = makeStyles(theme => ({
  root: {
    width: 'fit-content',
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.secondary,
    '& h3': {
      margin: theme.spacing(1.5),
    },
    '& hr': {
      margin: theme.spacing(0, 0.5),
    },
  },
}));

const Homeowner = ({ data }) => {
  const classes = useStyles();
  console.log(data.clients, 'data');
  const client = data.clients;
  return (
    <>
      <Layout>
        <h1>
          {client.firstName} {client.lastName}
        </h1>
        <Container>
          <Grid
            container
            alignItems="center"
            className={classes.root}
          >
            <Text>{client.email}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.addressLine1}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.addressLine2}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.city}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.state}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.zip}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.country}</Text>
            <Divider orientation="vertical" flexItem />
            <Text>{client.rep}</Text>
          </Grid>
        </Container>
      </Layout>
    </>
  );
};

export default Homeowner;

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
