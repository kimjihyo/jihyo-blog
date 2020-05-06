import React from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import useStyles from './style_Section';

type SectionProps = {
  title: string;
};

const Section = ({ title }: SectionProps) => {
  const classes = useStyles();
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <div className={classes.root}>
      <Typography className={isMobile ? classes.mobileTitle : classes.title}>
        {title}
      </Typography>
      <div className={classes.line} />
    </div>
  );
};

export default Section;
