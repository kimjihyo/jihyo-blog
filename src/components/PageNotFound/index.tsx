import React from 'react';
import { Typography, Box } from '@material-ui/core';
import useStyles from './style';

const PageNotFound = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Box display="flex" justifyContent="center">
        <Typography variant="h2">
          404 Page Not Found
          {' '}
          <span aria-label="emji" role="img">😢</span>
        </Typography>
      </Box>
    </div>
  );
};

export default PageNotFound;
