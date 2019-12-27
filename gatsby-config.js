require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

const path = require('path');

module.exports = {
  siteMetadata: {
    title: `Vision Solar Finance`,
    siteUrl: `https://www.visionsolarfinance.com`,
    description: `Finance Your Solar Powered Lifestyle`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitmap`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.join(__dirname, `src`, `images`),
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-offline`,
  ],
};
