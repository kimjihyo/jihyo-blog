import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
  },
  appBarButton: {
    fontSize: '10px',
    minWidth: 0,
    padding: '0 2em',
  },
  drawerButton: {
    fontSize: '14px',
    minWidth: 0,
    padding: '1em 2em',
  },
  selectedButtonLabel: {
    borderBottom: '3px solid #e53935',
    width: '3em',
    paddingBottom: '3px',
    textTransform: 'capitalize',
  },
  defaultButtonLabel: {
    textTransform: 'capitalize',
    color: 'grey',
  },
  drawer: {
    width: 280,
    backgroundColor: 'whitesmoke',
  },
  drawerPaper: {
    width: 280,
    backgroundColor: 'whitesmoke',
    border: 'none',
  },
  blogTitleContainerInDrawer: {
    marginTop: '5em',
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2em',
  },
  jobTitle: {
    color: '#e53935',
  },
  appBar: {
    backgroundColor: 'white',
    color: 'black',
  },
  blogTitleInDrawer: {
    fontFamily: 'Patua One, cursive',
  },
  blogTitle: {
    marginRight: 'auto',
    fontFamily: 'Patua One, cursive',
    padding: '1em',
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
  wideScreenContainer: {
    padding: '2em 1em',
    width: `calc(100% - ${280}px)`,
    marginLeft: 280,
  },
  googleSignInButton: {
    margin: '.5em 0',
  },
  dialog: {
  },
});

export default useStyles;
