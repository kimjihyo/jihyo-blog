import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  topRow: {
    marginBottom: '1em',
    display: 'flex',
  },
  breadcrumbs: {
    flexGrow: 1,
  },
  title: {},
  created: {
    color: 'gray',
  },
  body: {
    margin: '1em 0',
    marginBottom: '4em',
  },
  commentFormContainer: {
    display: 'flex',
  },
  commentTextField: {
    flexGrow: 1,
    marginRight: '1em',
  },
  comments: {
    marginTop: '1em',
  },
  commentBody: {
    color: 'black',
  },
  commentCreated: {
    color: 'grey',
  },
  inline: {
    display: 'inline',
  },
  circularProgress: {
    margin: '0 auto',
  },
  draftJsViewer: {
  },
});

export default useStyles;
