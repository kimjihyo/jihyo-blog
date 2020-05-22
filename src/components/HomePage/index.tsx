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
import HalloweenGameImage from '../../assets/halloween_game.png';
import GomokuImage from '../../assets/gomoku_screenshot.png';
import GratefulEstate from '../../assets/grateful_logo.png';

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
      <Section title="Work Experience" />
      <ProjectItem
        name="Realtor.com"
        link="https://www.realtor.com"
        sectionName="01"
        position="Co-op Software Engineer"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={RealtorComLogo}
      />
      <ProjectItem
        name="Base BC Students Network"
        link="https://web.base.town"
        sectionName="02"
        position="Full-stack Developer"
        description="Base BC Students Network is an app for students to build their official ntworking/portfolio base by chatting and collaborating with classmates and students from different schools"
        image={BaseLogo}
      />
      <Section title="Projects" />
      <ProjectItem
        name="Gomoku"
        link="https://web.base.town"
        sectionName="02"
        position="Personal Project - Game Development"
        description="Gomoku, also called Five in a Row, is an abstract strategy board game. It is traditionally played with Go pieces on a Go board. Implemented it in C++ with SFML, a wrapper library for OpenGL"
        image={GomokuImage}
      />
      <ProjectItem
        name="Grateful Estate"
        link="https://www.gratefulestate.com"
        sectionName="03"
        position="Company Project - Android App Development"
        description="Grateful Estate is a subscription-based service that helps you or your loved ones manage their end of life affairs. The service helps users connect with their loved ones and develop a Gratitude Register to keep what they are grateful for in mind."
        image={GratefulEstate}
      />
      <ProjectItem
        name="Google Halloween Game"
        link="https://www.realtor.com"
        sectionName="01"
        position="Personal Project - Game Development"
        description="Realtor.com is a real estate listings website operated by the News Corporation subsidiary Move, Inc."
        image={HalloweenGameImage}
      />
    </div>
  );
};

export default HomePage;
