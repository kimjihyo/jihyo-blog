import React from 'react';
import {
  Typography,
  Link,
  Breadcrumbs,
  Box,
  CircularProgress,
} from '@material-ui/core';
import useStyles from './style';
import { getBody } from '../../firebase/handlers';
import StoryEntry from '../../interfaces/StoryEntry';
import DraftJsViewer from '../StoryPage/DraftJsViewer';
import { useStoreState, useStoreActions } from '../../hooks';

const AboutPage: React.FC = () => {
  const classes = useStyles();
  const storyID = '5gklozNFuoxjXPpraPpr';
  const [story, setStory] = React.useState<StoryEntry>();
  const cache = useStoreState((state) => state.cache);
  const addStoryBodyToCache = useStoreActions((state) => state.cache.addStoryBodyToCache);

  React.useEffect(() => {
    if (storyID != null && cache.stories[storyID] !== undefined) {
      const tempStory = { ...cache.stories[storyID] };
      const bodyId = cache.stories[storyID].body;
      if (cache.storyBodies[bodyId] !== undefined) {
        tempStory.body = cache.storyBodies[bodyId].body;
        setStory(tempStory);
      } else {
        getBody(bodyId, (body) => {
          addStoryBodyToCache({ id: bodyId, body });
          tempStory.body = body;
          setStory(tempStory);
        });
      }
    }
  }, [cache, storyID, addStoryBodyToCache]);

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
