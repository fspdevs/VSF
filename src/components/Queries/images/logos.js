import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import Img from 'gatsby-image';
const Logo = () => (
  <StaticQuery
    query={graphql`
      query {
        logo: file(relativePath: { eq: "vsfLogo.png" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1280) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.logo.childImageSharp.fluid;
      return <Img fluid={imageData} style={{'zIndex': '200'}}/>;
    }}
  />
);



export default Logo;
