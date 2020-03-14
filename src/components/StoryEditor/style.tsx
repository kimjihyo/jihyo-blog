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
  },
  breadcrumbs: {
    marginBottom: '1em',
  },
  date: {
    marginBottom: '.5em',
  },
  titleEditor: {
    fontSize: '20px',
  },
  bodyEditor: {
    minHeight: '10em',
  },
});

export default useStyles;
