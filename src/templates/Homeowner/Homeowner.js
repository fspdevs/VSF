import React from 'react';
import { graphql, Link } from 'gatsby';
import { styled, makeStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';
import {
  Container,
  Divider,
  Grid,
  Typography,
  Box,
} from '@material-ui/core';
import theme from '../../theme';
import Project from '../Project/project';

const Name = styled(Typography)({
  fontSize: 16,
  color: 'cornflowerblue',
  font: theme.fonts.nuni,
  fontWeight: 'bold',
  textAlign: 'left',
  marginBottom: 10,
});

const Text = styled(Typography)({
  fontSize: 14,
  color: 'cornflowerblue',
  fontFamily: theme.fonts.nuni,
});
const Label = styled(Typography)({
  fontSize: 14,
  color: 'cornflowerblue',
  fontFamily: 'Nunito Sans',
  fontWeight: 'bold',
});

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
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
        <Container>
          <Name>
            <Link to="/home">Back</Link>
          </Name>
          <Name variant="h3">
            {client.firstName} {client.lastName} <em>{client.id}</em>
          </Name>

          <Grid
            container
            alignItems="center"
            className={classes.root}
          >
            <Grid item xs={2}>
              <Label>Email</Label>
              <Text variant="h3">{client.email}</Text>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Label>Call</Label>
              <Text variant="h3">{client.phone}</Text>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={5}>
              <Label>Directions</Label>

              <Text variant="h3">
                {client.addressLine1}, {client.addressLine2}{' '}
                {client.city}, {client.state} {client.zip},{' '}
                {client.country}
              </Text>
            </Grid>
            <Divider orientation="vertical" flexItem />
            <Grid item xs={2}>
              <Label>REP</Label>
              <Text variant="h3">{client.rep}</Text>
            </Grid>
          </Grid>
        </Container>
        <Box>
          <Project />
        </Box>
      </Layout>
    </>
  );
};

export default Homeowner;

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
