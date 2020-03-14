import React from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from 'draft-js';
import {
  Breadcrumbs,
  Link,
  Typography,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import useStyles from './style';
import { addStory, getStory, editStory } from '../../firebase/handlers';

type StoryEditorProps = {
  editorType: string;
};

type StoryDraft = {
  title: string;
  body: string;
};

const useQuery = () => new URLSearchParams(useLocation().search);

const StoryEditor = ({ editorType }: StoryEditorProps) => {
  const classes = useStyles();
  const query = useQuery();
  const queryStoryId = query.get('storyId');
  const history = createBrowserHistory({ forceRefresh: true });

  const [storyDraft, setStoryDraftState] = React.useState<StoryDraft>({
    title: '',
    body: '',
  });

  if (
    editorType === 'edit'
    && queryStoryId
    && storyDraft.title === ''
    && storyDraft.body === ''
  ) {
    getStory(queryStoryId, (s) => {
      setStoryDraftState({
        title: s.title,
        body: s.body,
      });
    });
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const onSubmit = () => {
    if (storyDraft !== undefined) {
      if (editorType === 'createNew') {
        addStory(
          {
            title: storyDraft.title,
            body: storyDraft.body,
            created: new Date(),
          },
          (storyId) => {
            history.push(`/stories/?storyId=${storyId}`);
          },
        );
      } else if (editorType === 'edit' && queryStoryId) {
        editStory(queryStoryId, storyDraft, () => {
          history.push(`/stories/?storyId=${queryStoryId}`);
        });
      }
    }
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  };

  return (
    <div className={classes.root}>
      <div className={classes.breadcrumbs}>
        <Breadcrumbs aria-label="breadcrumbs">
          <Link color="inherit" href="/">
            Material-UI
          </Link>
          <Link color="inherit" href="/getting-started/installation/">
            Core
          </Link>
          <Typography color="textPrimary">Breadcrumb</Typography>
        </Breadcrumbs>
      </div>
      <div className={classes.titleEditor}>
        <TitleEditor
          setTitle={(title) => {
            storyDraft.title = title;
            setStoryDraftState(storyDraft);
          }}
          title={storyDraft.title}
        />
      </div>
      <div className={classes.bodyEditor}>
        <BodyEditor
          setBody={(body) => {
            storyDraft.body = body;
            setStoryDraftState(storyDraft);
          }}
          body={storyDraft.body}
        />
      </div>
      <Box display="flex" justifyContent="flex-end">
        <Button variant="outlined" color="primary" onClick={onSubmit}>
          {editorType === 'createNew' ? 'Create Story' : 'Save Changes'}
        </Button>
      </Box>
    </div>
  );
};

type TitleEditorProps = {
  setTitle: (title: string) => void;
  title?: string;
};

const TitleEditor = ({ setTitle, title }: TitleEditorProps) => {
  const [editorState, setEditorState] = React.useState(
    title
      ? EditorState.moveFocusToEnd(
        EditorState.createWithContent(ContentState.createFromText(title)),
      )
      : EditorState.moveFocusToEnd(EditorState.createEmpty()),
  );

  const onChange = (_editorState: EditorState) => {
    setTitle(_editorState.getCurrentContent().getPlainText());
    setEditorState(_editorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Enter a title ..."
      />
    </div>
  );
};

type BodyEditorProps = {
  setBody: (body: string) => void;
  body?: string;
};

const BodyEditor = ({ setBody, body }: BodyEditorProps) => {
  const [editorState, setEditorState] = React.useState(
    body
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
      : EditorState.createEmpty(),
  );

  const onChange = (_editorState: EditorState) => {
    setBody(JSON.stringify(convertToRaw(_editorState.getCurrentContent())));
    setEditorState(_editorState);
  };

  return (
    <div>
      <Editor
        editorState={editorState}
        onChange={onChange}
        placeholder="Type your thoughts ..."
      />
    </div>
  );
};

export default StoryEditor;
