import React from 'react';
import { Typography } from '@material-ui/core';
import useStyles from './style';

const Footer: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.line} />
      <div className={classes.footerText}>
        <Typography variant="body2">
          © 2020 Jihyo Kim. Made from scratch with React.
        </Typography>
      </div>
    </div>
  );
};

export default Footer;
