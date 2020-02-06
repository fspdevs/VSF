exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const result = await graphql(`
    query {
      allClients {
        nodes {
          firstName
          lastName
          id
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
      context: { slug: slug },
    });
  });
};
