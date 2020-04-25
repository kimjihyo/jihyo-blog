/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import { Box, Typography, Button } from '@material-ui/core';
import useStyles from './style';

const HomePage = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.introContainer}>
        <div>
          <div className={classes.introText}>
            <Typography>
              <Box fontWeight="bold" fontSize={22} style={{ marginBottom: '.5em' }}>
                Hi there, I'm Jihyo Kim.
              </Box>
              <Box fontSize={18}>
                I'm a student in Computer Systems Technology
                at British Columbia Institute of Technology.
                Passionate in web, mobile and game development.
              </Box>
            </Typography>

          </div>
          <div className={classes.introButtons}>
            <Button>Resume</Button>
            <Button>Email</Button>
            <Button>LinkedIn</Button>
            <Button>GitHub</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
