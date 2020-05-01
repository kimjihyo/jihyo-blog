import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './style_Section';

type SectionProps = {
  title: string;
};

const Section = ({ title }: SectionProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography className={classes.title}>
        {title}
      </Typography>
      <div className={classes.line} />
    </div>
  );
};

export default Section;
