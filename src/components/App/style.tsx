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
  line: {
    height: 4,
    backgroundColor: 'black',
  },
  appBar: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    color: 'black',
  },
  blogTitle: {
    fontFamily: 'Josen',
    padding: '1em',
  },
  tabs: {
    margin: '0 1em',
  },
  title: {
    marginRight: '1em',
  },
  signInButton: {
    marginRight: '1em',
    marginLeft: 'auto',
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
