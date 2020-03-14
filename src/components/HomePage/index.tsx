import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button, Box, CircularProgress, Typography,
} from '@material-ui/core';
import { getStories } from '../../firebase/handlers';
import useStyles from './style';
import StoryEntry from '../../interfaces/StoryEntry';

const HomePage: React.FC = () => {
  const [stories, setStories] = useState<StoryEntry[]>();
  const classes = useStyles();

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
      <Typography variant="h4" className={classes.title}>
        {`Stories (${stories.length}) `}
        <span role="img" aria-label="emoji">
          🔥
        </span>
      </Typography>
      {stories.map((story) => (
        <Button
          variant="outlined"
          color="primary"
          key={story.id}
          component={Link}
          to={`stories?storyId=${story.id}`}
        >
          {story.title}
        </Button>
      ))}
    </div>
  );
};

export default HomePage;
