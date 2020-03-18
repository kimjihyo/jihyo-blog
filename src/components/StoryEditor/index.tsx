/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
  Editor,
  EditorState,
  convertToRaw,
  ContentState,
  convertFromRaw,
} from 'draft-js';
import PluginEditor from 'draft-js-plugins-editor';
import createSideToolbarPlugin from 'draft-js-side-toolbar-plugin';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import 'draft-js-side-toolbar-plugin/lib/plugin.css';
import {
  Breadcrumbs,
  Link,
  Button,
  Box,
  CircularProgress,
} from '@material-ui/core';
import { createBrowserHistory } from 'history';
import { useLocation } from 'react-router-dom';
import useStyles from './style';
import {
  addStory,
  getStory,
  editStory,
  hideStory,
} from '../../firebase/handlers';

type StoryEditorProps = {
  editorType: string;
};

type StoryDraft = {
  title: string;
  body: string;
  category?: string;
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
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty(),
  );
  const [editor, setEditor] = React.useState<Editor | null>();
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
        category: s.category,
      });
      if (s.category) {
        setEditorState(
          EditorState.createWithContent(ContentState.createFromText(s.category)),
        );
      }
    });
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  }

  const onChange = (_editorState: EditorState) => {
    setEditorState(_editorState);
  };

  const onClick = () => {
    if (editor) {
      editor.focus();
    }
  };

  const onSubmit = () => {
    if (storyDraft !== undefined) {
      if (editorType === 'createNew') {
        const category = editorState.getCurrentContent().getPlainText();
        addStory(
          {
            title: storyDraft.title,
            body: storyDraft.body,
            created: new Date(),
            category: category !== '' ? category : 'Miscellaneous',
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

  const onDeleteButtonClicked = () => {
    if (queryStoryId) {
      hideStory(queryStoryId, () => {
        history.push('/');
      });
    }
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
          <span onClick={onClick}>
            <Editor
              editorState={editorState}
              onChange={onChange}
              placeholder="Enter a category"
              ref={(e) => setEditor(e)}
            />
          </span>
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
        {editorType === 'edit' && (
          <Button
            className={classes.deleteButton}
            variant="outlined"
            color="secondary"
            onClick={onDeleteButtonClicked}
          >
            Delete Story
          </Button>
        )}
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
  const [editor, setEditor] = React.useState<Editor | null>();
  const onClick = () => {
    if (editor) {
      editor.focus();
    }
  };

  const onChange = (_editorState: EditorState) => {
    setTitle(_editorState.getCurrentContent().getPlainText());
    setEditorState(_editorState);
  };

  return (
    <div onClick={onClick}>
      <Editor
        ref={(e) => setEditor(e)}
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

const sideToolBarPlugin = createSideToolbarPlugin();
const linkifyPlugin = createLinkifyPlugin();
const { SideToolbar } = sideToolBarPlugin;

const BodyEditor = ({ setBody, body }: BodyEditorProps) => {
  const [editorState, setEditorState] = React.useState(
    body
      ? EditorState.createWithContent(convertFromRaw(JSON.parse(body)))
      : EditorState.createEmpty(),
  );
  const [editor, setEditor] = React.useState<PluginEditor | null>();

  const onChange = (_editorState: EditorState) => {
    setBody(JSON.stringify(convertToRaw(_editorState.getCurrentContent())));
    setEditorState(_editorState);
  };

  const onClick = () => {
    if (editor) {
      editor.focus();
    }
  };

  return (
    <div onClick={onClick}>
      <PluginEditor
        ref={(e) => setEditor(e)}
        plugins={[sideToolBarPlugin, linkifyPlugin]}
        editorState={editorState}
        onChange={onChange}
        placeholder="Type your thoughts ..."
      />
      <SideToolbar />
    </div>
  );
};

export default StoryEditor;
