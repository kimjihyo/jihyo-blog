import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {

  },
  introContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '40em',
    height: '55vh',
    paddingLeft: '1em',
  },
  introText: {
    padding: '.5em',
  },
  introButtons: {
    marginTop: '1em',
  },
}));

export default useStyles;
