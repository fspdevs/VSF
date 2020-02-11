exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allClients {
        nodes {
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
    }
  `);
  console.log(JSON.stringify(result, null, 4));
  result.data.allClients.nodes.forEach(node => {
    const slug = `/client/${node.id}`;
    createPage({
      path: slug,
      component: require.resolve(`./src/templates/Homeowner/Homeowner.js`),
      context: { clientId: node.id },
    });
  });
};
