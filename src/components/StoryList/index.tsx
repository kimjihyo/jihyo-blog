import React, { useState } from 'react';
import {
  Link, Box, CircularProgress, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './style';
import StoryEntry from '../../interfaces/StoryEntry';
import { getStories } from '../../firebase/handlers';

const StoryList = () => {
  const classes = useStyles();
  const [stories, setStories] = useState<StoryEntry[]>();

  React.useEffect(() => {
    getStories((r) => {
      setStories(r);
    });
  }, []);

  if (stories === undefined) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.listLabel}>
        Recent stories
      </Typography>
      {stories.map((story) => (
        <div key={story.id}>
          <Box display="flex" whiteSpace="nowrap">
            <Box
              flexGrow={1}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              <Link component={RouterLink} to={`/stories?storyId=${story.id}`}>
                <Typography className={classes.title} variant="body2">
                  {story.title}
                </Typography>
              </Link>
            </Box>
            <Typography className={classes.category} variant="caption">
              {story.category ? story.category : 'Miscelleneous'}
            </Typography>
            <Typography variant="caption" className={classes.created}>
              {story.created?.toDateString()}
            </Typography>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
