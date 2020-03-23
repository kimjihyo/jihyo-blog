import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .public-DraftEditorPlaceholder-root': {
      position: 'absolute',
      color: 'gray',
    },
    '& .public-DraftEditorPlaceholder-hasFocus': {
      color: 'lightgray',
    },
    '& .DraftEditor-root': {
      padding: '1em 0',
      fontFamily: 'Roboto',
    },
    '& .draftJsToolbar__wrapper__9NZgg': {
      marginTop: '-15.5em',
    },
  },
  breadcrumbs: {
    marginBottom: '1em',
  },
  date: {
    marginBottom: '.5em',
  },
  titleEditor: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: 'white',
  },
  bodyEditor: {
    minHeight: '10em',
    marginBottom: '2em',
    color: 'white',
  },
  deleteButton: {
    marginLeft: '1em',
  },
});

export default useStyles;
