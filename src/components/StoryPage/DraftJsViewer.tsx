import React from 'react';
import PluginEditor from 'draft-js-plugins-editor';
import { EditorState, convertFromRaw, CompositeDecorator } from 'draft-js';
import createLinkifyPlugin from 'draft-js-linkify-plugin';
import useStyles from './style';

type DraftJsViewerProps = {
  content: string;
};

const linkifyPlugin = createLinkifyPlugin();
const DraftJsViewer = ({ content }: DraftJsViewerProps) => {
  const classes = useStyles();
  const contentState = convertFromRaw(JSON.parse(content));
  const editorState = EditorState.createWithContent(
    contentState,
    new CompositeDecorator(linkifyPlugin.decorators),
  );
  return (
    <div className={classes.draftJsViewer}>
      <PluginEditor
        plugins={[linkifyPlugin]}
        readOnly
        onChange={() => {}}
        editorState={editorState}
      />
    </div>
  );
};

export default DraftJsViewer;
