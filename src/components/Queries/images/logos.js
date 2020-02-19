import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Img from 'gatsby';
// import styled from 'styled-components';

export const fluidImageLogo = graphql`
  fragment fluidImageLogo on File {
    childImageSharp {
      fluid(fit: COVER) {
        ...GatsbyImageSharpFluid
      }
    }
  }
`;

export const Data = () => {
  const vsfLogos = useStaticQuery(
    graphql`
      query LogosQuery {
        landingLogo: file(relativePath: { eq: "VSFLogoSquare.png" }) {
          ...fluidImageLogo
        }
      }
    `,
  );
  return vsfLogos;
};

export const LandingPageLogo = () => {
  const logoImage = Data();
  return (
    <Img fluid={logoImage.landingLogo.childImageSharp.fluid}/>
  );
};
