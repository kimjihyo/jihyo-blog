/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Box, Typography, Button, useMediaQuery,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './style';

const HomePage = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(min-width:600px)');

  return (
    <div className={classes.root}>
      <div className={classes.introContainer}>
        <div>
          <div className={classes.introText}>
            <Typography>
              <Box fontWeight="bold" fontSize={isMobile ? 22 : 18} style={{ marginBottom: '.5em' }}>
                Hi there, I'm Jihyo Kim.
              </Box>
              <Box fontSize={isMobile ? 18 : 14}>
                I'm a student in Computer Systems Technology
                at British Columbia Institute of Technology.
                Passionate in web, mobile and game development.
              </Box>
            </Typography>
          </div>
          <div className={classes.introButtons}>
            <Button>Email</Button>
            <Button>LinkedIn</Button>
            <Button>GitHub</Button>
            <Button component={Link} to="/archives">Archives</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
