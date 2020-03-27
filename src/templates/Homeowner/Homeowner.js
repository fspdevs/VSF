import React from 'react';
import { graphql } from 'gatsby';
// import { withFirebase } from '../../components/Firebase';
// import { withStyles } from '@material-ui/core/styles';
import Layout from '../../components/layout';

const Homeowner = ({ data }) => {
  console.log(data.clients, 'data');
  const client = data.clients;
  return (
    <>
      <Layout>
        <h1>Home Owner Component</h1>
        <h3>
          {client.firstName} {client.lastName}
        </h3>
        <h3>{client.email}</h3>
        <h3>{client.addressLine1}</h3>
        <h3>{client.addressLine2}</h3>
        <h3>{client.city}</h3>
        <h3>{client.state}</h3>
        <h3>{client.zip}</h3>
        <h3>{client.country}</h3>
        <h3>{client.rep}</h3>
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
