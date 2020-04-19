import React, { useState } from 'react';
import {
  Link, Box, CircularProgress, Typography,
} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './style';
import StoryEntry from '../../interfaces/StoryEntry';
import { getStories } from '../../firebase/handlers';
import { useStoreState, useStoreActions } from '../../hooks';

const StoryList = () => {
  const classes = useStyles();
  const [stories, setStories] = useState<StoryEntry[]>();
  const cache = useStoreState((state) => state.cache);
  const addStoriesToCache = useStoreActions((state) => state.cache.addStoriesToCache);

  const fetchStories = React.useCallback(() => {
    if (Object.keys(cache.stories).length === 0) {
      getStories((r) => {
        addStoriesToCache(r);
      });
    } else {
      setStories(Object.values(cache.stories));
    }
  }, [addStoriesToCache, cache.stories]);

  React.useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  if (stories === undefined) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="secondary" />
      </Box>
    );
  }
  return (
    <div className={classes.root}>
      <Typography variant="h6" color="textSecondary" className={classes.listLabel}>
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
                <Typography
                  className={story.hidden ? classes.titleForHiddenStory : classes.title}
                  color="textPrimary"
                  variant="body2"
                >
                  {story.title}
                </Typography>
              </Link>
            </Box>
            <Typography className={classes.category} variant="caption">
              {story.category ? story.category : 'Miscelleneous'}
            </Typography>
            <Typography variant="caption" className={classes.created}>
              {(new Date(story.created).toDateString())}
            </Typography>
          </Box>
        </div>
      ))}
    </div>
  );
};

export default StoryList;
