/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import {
  Box, Typography, Button, useMediaQuery,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './style';
import Section from './Section';
import ProjectItem from './ProjectItem';

import RealtorComLogo from '../../assets/realtorcom_logo.png';
import BaseLogo from '../../assets/base.jpg';
import HalloweenGame from '../../assets/halloween_game.png';
import GomokuScreenshot from '../../assets/gomoku_screenshot.png';

const HomePage = () => {
  const classes = useStyles();
  const isNotMobile = useMediaQuery('(min-width:600px)');
  const isWideScreen = useMediaQuery('(max-width:1100px)');

  return (
    <div className={classes.root}>
      <div className={classes.introContainer}>
        <div>
          <div className={classes.introText}>
            <Typography>
              <Box
                fontWeight="bold"
                fontSize={isNotMobile ? 22 : 18}
                style={{ marginBottom: '.5em' }}
              >
                Hi there, I'm Jihyo.
              </Box>
              <Box fontSize={isNotMobile ? 16 : 12}>
                I'm a student in Computer Systems Technology at British Columbia
                Institute of Technology.
                <br />
                Passionate in web, mobile and game development.
              </Box>
            </Typography>
          </div>
          {isWideScreen && (
            <div className={classes.introButtons}>
              <Button>Email</Button>
              <Button>LinkedIn</Button>
              <Button>GitHub</Button>
              <Button component={Link} to="/archives">
                Archives
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* <Section title="Work Experience" />
      <ProjectItem
        name="Realtor.com"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={RealtorComLogo}
      />
      <ProjectItem
        name="Base BC Students Network"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={BaseLogo}
      />
      <Section title="Projects" />
      <ProjectItem
        name="Google Halloween Game"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={HalloweenGame}
      />
      <ProjectItem
        name="Gomoku"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={GomokuScreenshot}
      /> */}
    </div>
  );
};

export default HomePage;
