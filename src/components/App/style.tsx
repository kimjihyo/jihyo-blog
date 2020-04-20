import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    '& .MuiButtonBase-root': {
      fontSize: '10px',
      minWidth: 0,
      paddingLeft: '2em',
      paddingRight: '2em',
    },
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black',
  },
  blogTitle: {
    marginRight: '2em',
  },
  tabs: {
    flexGrow: 1,
  },
  title: {
    marginRight: '1em',
  },
  signInButton: {
    marginRight: '1em',
  },
  container: {
    padding: '2em 1em',
  },
  googleSignInButton: {
    margin: '.5em 0',
  },
  dialog: {
  },
});

export default useStyles;
