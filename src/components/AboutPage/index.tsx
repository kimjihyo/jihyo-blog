import React from 'react';
import {
  Typography,
  Link,
  Breadcrumbs,
  Box,
  CircularProgress,
} from '@material-ui/core';
import useStyles from './style';
import { getStory } from '../../firebase/handlers';
import StoryEntry from '../../interfaces/StoryEntry';
import DraftJsViewer from '../StoryPage/DraftJsViewer';

const AboutPage: React.FC = () => {
  const classes = useStyles();
  const storyID = '5gklozNFuoxjXPpraPpr';
  const [story, setStory] = React.useState<StoryEntry>();

  React.useEffect(() => {
    getStory(storyID, (s) => {
      setStory(s);
    });
  }, []);

  if (story === undefined) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumbs">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/getting-started/installation/">
          About me
        </Link>
        <Typography color="textPrimary">About</Typography>
      </Breadcrumbs>
      <DraftJsViewer content={story.body} />
    </div>
  );
};

export default AboutPage;
