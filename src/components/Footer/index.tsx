import React from 'react';
import { Typography, IconButton } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GithubIcon from '@material-ui/icons/GitHub';
import EmailIcon from '@material-ui/icons/Email';
import useStyles from './style';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <span className={classes.icons}>
        <Typography variant="caption" />
        <IconButton component="a" href="mailto: kimjihyo0325@gmail.com">
          <EmailIcon />
        </IconButton>
        <IconButton component="a" href="https://www.facebook.com/profile.php?id=100006776461314">
          <FacebookIcon />
        </IconButton>
        <IconButton component="a" href="https://www.linkedin.com/in/jihyo-kim-084338156/">
          <LinkedInIcon />
        </IconButton>
        <IconButton component="a" href="https://github.com/kimjihyo">
          <GithubIcon />
        </IconButton>
      </span>
    </div>
  );
};

export default Footer;
