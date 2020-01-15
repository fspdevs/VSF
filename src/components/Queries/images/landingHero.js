import React from 'react';
import { graphql, StaticQuery } from 'gatsby';
import styled from 'styled-components';
import BackgroundImage from 'gatsby-background-image';

export const OverlayLanding = styled.div`
  height: 100vh;
  opacity: 0.5;
  background: black;
  width: 100vw;
  z-index: 1;
  margin-top: 0px;
`;

const AboutHeroBG = ({ children, className }) => (
  <StaticQuery
    query={graphql`
      query {
        desktop: file(relativePath: { eq: "heroImage2.jpg" }) {
          childImageSharp {
            fluid(quality: 90, maxWidth: 1920) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    `}
    render={data => {
      // Set ImageData.
      const imageData = data.desktop.childImageSharp.fluid;
      return (
        <BackgroundImage
          Tag="section"
          className={className}
          alt=""
          fluid={imageData}
          backgroundColor={`#040e18`}
        >
          {children}
        </BackgroundImage>
      );
    }}
  />
);
export const StyledAboutHeroBG = styled(AboutHeroBG)`
  width: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: absolute !important;
  height: 100vh;
  margin-top: -8px;
  margin-left: -8px;
  z-index: -100;
  //   @media only screen and (max-width: 550px) {
  //     height: 720px;
  //   }
`;
