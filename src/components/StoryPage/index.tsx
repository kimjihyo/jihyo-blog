import React, { useState } from 'react';
import {
  Typography,
  Breadcrumbs,
  Link,
  List,
  ListItem,
  ListItemText,
  Divider,
  TextField,
  Button,
  CircularProgress,
  Box,
} from '@material-ui/core';
import { useLocation, Link as RouterLink } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import useStyles from './style';
import StoryEntry from '../../interfaces/StoryEntry';
import {
  getStory, getComments, addComment, getBody,
} from '../../firebase/handlers';
import CommentEntry from '../../interfaces/CommentEntry';
import DraftJsViewer from './DraftJsViewer';
import PageNotFound from '../PageNotFound';
import { useStoreState, useStoreActions } from '../../hooks';
import { checkIfValidUser, checkIfRootUser } from '../../firebase/auth';
import LoginAlertDialog from '../App/LoginAlertDialog';

type StoryPageProps = {
  _storyId?: string;
  hideTitle?: boolean;
  hideCommentSection?: boolean;
  hideCreated?: boolean;
};


const CommentEntrySchema = yup.object().shape({
  body: yup
    .string()
    .trim()
    .required('Enter a comment.')
    .min(10, 'Comment must be at least 10 chracters.'),
});

const useQuery = () => new URLSearchParams(useLocation().search);

const StoryPage = ({
  _storyId, hideTitle, hideCommentSection, hideCreated,
}: StoryPageProps) => {
  const classes = useStyles();
  const query = useQuery();
  const storyId = _storyId !== undefined ? _storyId : query.get('storyId');
  const cache = useStoreState((state) => state.cache);
  const addStoryBodyToCache = useStoreActions((state) => state.cache.addStoryBodyToCache);
  const addStoryToCache = useStoreActions((state) => state.cache.addStoryToCache);
  const userInfo = useStoreState((state) => state.userSession.user);
  const defaultId = '';

  const [story, setStory] = useState<StoryEntry>();
  const [pageNotFound, setPageNotFound] = useState<boolean>(false);

  React.useEffect(() => {
    if (storyId != null && cache.stories[storyId] !== undefined) {
      const tempStory = { ...cache.stories[storyId] };
      const bodyId = cache.stories[storyId].body;
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
    } else if (storyId != null && cache.stories[storyId] === undefined) {
      getStory(storyId, (_story) => {
        const tempStory = { ..._story };
        addStoryToCache(_story);
        getBody(_story.body, (body) => {
          addStoryBodyToCache({ id: _story.body, body });
          tempStory.body = body;
          setStory(tempStory);
        });
      }, () => {
        setPageNotFound(true);
      });
    }
  }, [cache, storyId, addStoryBodyToCache, addStoryToCache]);

  if (pageNotFound) {
    return <PageNotFound />;
  }
  if (story === undefined) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  if (story.isLocked === true && !checkIfRootUser(userInfo)) {
    return <PageNotFound />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.topRow}>
        <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumbs">
          <Link color="inherit" href="/">
            Home
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Stories
          </Link>
          <Typography>{story.category}</Typography>
        </Breadcrumbs>
        {checkIfRootUser(userInfo) && (
          <>
            <Button
              variant="outlined"
              component={RouterLink}
              to={`/edit?storyId=${storyId}`}
            >
              Edit
            </Button>
          </>
        )}
      </div>
      {(hideTitle == null || !hideTitle)
      && (
      <div className={classes.title}>
        <Typography component="div" color="textPrimary">
          <Box fontSize={28} fontWeight="bold" lineHeight={1}>
            {story.title}
          </Box>
        </Typography>
      </div>
      )}
      {(hideCreated == null || !hideCreated)
      && (
        <div className={classes.created}>
          <Typography variant="caption" color="textPrimary">
            {(new Date(story.created).toDateString())}
          </Typography>
        </div>
      )}
      <div className={classes.body}>
        <DraftJsViewer content={story.body} />
      </div>
      {(hideCommentSection == null || !hideCommentSection)
      && <CommentSection storyId={storyId || defaultId} />}
    </div>
  );
};

type CommentSectionProps = {
  storyId: string;
};

const CommentSection = ({ storyId }: CommentSectionProps) => {
  const classes = useStyles();
  const userInfo = useStoreState((state) => state.userSession.user);
  const {
    register, handleSubmit, errors, reset,
  } = useForm<CommentEntry>({
    validationSchema: CommentEntrySchema,
  });

  const [comments, setComments] = useState<CommentEntry[]>();
  const [loginDialogOpen, setLoginDialogOpen] = React.useState<boolean>(false);

  const handleSignInDialogClose = () => {
    setLoginDialogOpen(false);
  };

  const onSubmit = (data: CommentEntry) => {
    if (checkIfValidUser(userInfo)) {
      data.name = userInfo.displayName ? userInfo.displayName : userInfo.uid;
      data.photoURL = userInfo.photoURL;
      data.created = new Date();
      addComment(storyId, data, (id) => {
        data.id = id;
        comments?.unshift(data);
        setComments(comments);
        reset();
      });
    } else {
      setLoginDialogOpen(true);
    }
  };

  React.useEffect(() => {
    getComments(storyId, (r) => {
      setComments(r);
    });
  }, [storyId]);

  if (comments === undefined) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress color="secondary" />
      </Box>
    );
  }

  return (
    <div>
      <div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={classes.commentFormContainer}
        >
          <TextField
            color="secondary"
            className={classes.commentTextField}
            InputProps={{ classes: { input: classes.commentTextFieldInput } }}
            InputLabelProps={{
              shrink: true,
            }}
            inputRef={register}
            variant="outlined"
            label="Comment"
            name="body"
            autoComplete="off"
            error={!!errors.body}
          />
          <Button type="submit" variant="outlined" color="secondary">
            Submit
          </Button>
        </form>
        <LoginAlertDialog
          open={loginDialogOpen}
          onClose={handleSignInDialogClose}
        />
      </div>
      <div className={classes.comments}>
        <List>
          {comments.map((comment, i) => (
            <div key={comment.id ? comment.id : comment.name}>
              <ListItem alignItems="flex-start">
                <ListItemText
                  primary={(
                    <>
                      <Typography color="textPrimary" component="div">
                        <Box fontSize={13} fontWeight="bold">
                          {comment.name}
                        </Box>
                      </Typography>
                      <Typography
                        variant="caption"
                        className={classes.commentCreated}
                      >
                        {comment.created.toDateString()}
                      </Typography>
                    </>
                  )}
                  secondary={(
                    <Typography color="textPrimary" component="div">
                      <Box fontSize={12}>{comment.body}</Box>
                    </Typography>
                  )}
                />
              </ListItem>
              {comments.length !== i + 1 ? (
                <Divider variant="inset" component="li" />
              ) : (
                <></>
              )}
            </div>
          ))}
        </List>
      </div>
    </div>
  );
};

export default StoryPage;
