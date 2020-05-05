import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import useStyles from './style_ProjectItem';

type ProjectItemProps = {
  name: string;
  sectionName: string;
  description: string;
  image: string;
  position?: string;
  link?: string;
};

const ProjectItem = ({
  name, sectionName, description, image, position, link,
}: ProjectItemProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <div className={classes.firstColumn}>
        <div className={classes.dividerRow}>
          <div className={classes.divider} />
          <Typography className={isMobile ? classes.mobileSectionNumber : classes.sectionNumber}>
            {sectionName}
          </Typography>
        </div>
        <div className={classes.textArea}>
          <Typography className={isMobile ? classes.mobileName : classes.name}>
            {name}
          </Typography>
          {position !== undefined && (
          <Typography className={isMobile ? classes.mobilePosition : classes.position}>
            {position}
          </Typography>
          )}
          <Typography
            className={isMobile ? classes.mobileDescription : classes.description}
          >
            {description}
            {link !== undefined && (
              <>
                {' '}
                <a href={link}>{link}</a>
              </>
            )}
          </Typography>
        </div>
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
