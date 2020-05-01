import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import useStyles from './style_ProjectItem';

type ProjectItemProps = {
  name: string;
  description: string;
  image: string;
};

const ProjectItem = ({ name, description, image }: ProjectItemProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <div className={classes.textArea}>
        <Typography className={isMobile ? classes.mobileName : classes.name}>
          {name}
        </Typography>
        <Typography
          className={isMobile ? classes.mobileDescription : classes.description}
        >
          {description}
        </Typography>
      </div>
      <div className={classes.imageArea}>
        <img
          className={isMobile ? classes.mobileImage : classes.image}
          src={image}
          alt=""
        />
      </div>
    </div>
  );
};

export default ProjectItem;
