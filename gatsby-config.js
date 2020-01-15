require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});
module.exports = {
  siteMetadata: {
    title: `Vision Solar Finance`,
    siteUrl: `https://www.visionsolarfinance.com`,
    description: `Finance Your Solar Powered Lifestyle`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sitemap`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,

    {
      resolve: `gatsby-plugin-prefetch-google-fonts`,
      options: {
        fonts: [
          {
            family: `Nunito Sans`,
            variants: [`400`, `600`, `800`],
          },
          {
            family: `Montserrat`,
            variants: [`300`, `400`, `400i`, `500`, `600`],
          },
          {
            family: `Spectral`,
            variants: [`400`, `600`, `800`],
          },
          {
            family: `Karla`,
            variants: [`400`, `700`],
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-offline`,
  ],
};
