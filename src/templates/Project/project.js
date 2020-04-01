import React from 'react';
import { graphql } from 'gatsby';
import { styled, makeStyles } from '@material-ui/core/styles';
import {
  Container,
  Divider,
  Grid,
  Typography,
  Paper,
} from '@material-ui/core';
import theme from '../../theme';

const ProjectCard = styled(Paper)({});

const useStyles = makeStyles(theme => ({
  projectWrap: {
    width: 500,
  },
}));

const Project = () => {
  const classes = useStyles();
  return (
    <div className={classes.projectWrap}>
      <ProjectCard>
        <h1>Project Object</h1>
      </ProjectCard>
    </div>
  );
};

export default Project;
