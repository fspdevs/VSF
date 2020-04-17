import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import {
  StyledAboutHeroBG,
  OverlayLanding,
} from '../components/Queries/images/landingHero';
import {
  AppBar,
  Typography,
  Button,
  Container,
  Paper,
  Fab,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import theme from '../theme';
import Logo from '../components/Queries/images/logos';

// import Layout from '../components/layout';

const LandingWrap = styled(Container)({
  zIndex: 4,
  // alignItems: 'center',
  width: '100vw',
  // display: 'flex',
  // flexDirection: 'column',
  textAlign: 'center',
  // justifyItems: 'center',
});

const FAB = styled(Fab)({
  margin: 20,
  width: 100,
  backgroundColor: theme.color.cornBlue,
  color: theme.color.soulOrange,
  fontFamily: 'karla',
  // textShadow: '1px 2px 3px black',
});

const A = styled(Link)({
  textDecorationLine: 'none',
  color: theme.color.soulOrange,
  letterSpacing: 1,
});

const LogoWrap = styled(Container)({
  display: 'block',
  position: 'relative',
  width: '50%',
  backgroundColor: 'transparent',
});
const OverlayLogo = styled(Container)({
  display: 'block',
  // width: '50%',
  backgroundColor: 'white',
  opacity: '.35',
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: '0',
  left: '0',
  borderRadius: '40px',
});

const styles = {
  body: {
    margin: 0,
  },
};

const LandingPage = props => {
  const classes = props;
  return (
    <>
      <Helmet>
        <body className={classes.body} />
      </Helmet>
      <StyledAboutHeroBG>
        <OverlayLanding></OverlayLanding>
      </StyledAboutHeroBG>

      <LandingWrap>
        <LogoWrap>
          <Logo />
          <OverlayLogo></OverlayLogo>
          <A to="/signin">
            <FAB variant="extended">Sign In</FAB>
          </A>
          <A to="signup">
            <FAB variant="extended">Sign Up</FAB>
          </A>
        </LogoWrap>
      </LandingWrap>
    </>
  );
};
export default withStyles(styles)(LandingPage);
