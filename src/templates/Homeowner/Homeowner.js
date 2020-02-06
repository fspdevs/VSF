import React from 'react';
import { graphql } from 'gatsby';
import { withFirebase } from '../../components/Firebase';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';

const Homeowner = ({ data }) => {
  console.log(data.clients, 'data');
  const client = data.clients;
  return (
    <>
      <Layout>
        <h1>Home Owner Component</h1>
        <h3>{client.firstName}</h3>
        <h3>{client.lastName}</h3>
        <h3>{client.email}</h3>
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
      email
    }
  }
`;
