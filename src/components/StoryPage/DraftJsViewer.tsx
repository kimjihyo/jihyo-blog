import React from 'react';
import {
  Editor,
  EditorState,
  convertFromRaw,
} from 'draft-js';
import useStyles from './style';

type DraftJsViewerProps = {
  content: string;
};

const DraftJsViewer = ({ content }: DraftJsViewerProps) => {
  const classes = useStyles();
  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(contentState);
  return (
    <div className={classes.draftJsViewer}>
      <Editor readOnly onChange={() => {}} editorState={editorState} />
    </div>
  );
};

export default DraftJsViewer;
