import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiListItem-gutters': {
      paddingLeft: 0,
      paddingRight: 0,
    },
    '& .MuiDivider-inset': {
      marginLeft: 0,
    },
  },
  topRow: {
    marginBottom: '1em',
    display: 'flex',
  },
  breadcrumbs: {
    flexGrow: 1,
  },
  title: {
    marginBottom: '.5em',
  },
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
    marginRight: '1em !important',
  },
  commentTextFieldInput: {
    height: 5,
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
    fontSize: '14px',
    lineHeight: '1.5',
  },
});

export default useStyles;
