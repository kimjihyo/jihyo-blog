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
        <IconButton>
          <EmailIcon />
        </IconButton>
        <IconButton>
          <FacebookIcon />
        </IconButton>
        <IconButton>
          <LinkedInIcon />
        </IconButton>
        <IconButton>
          <GithubIcon />
        </IconButton>
      </span>
    </div>
  );
};

export default Footer;
