import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
  introContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '55vh',
    paddingLeft: '1em',
    paddingBottom: '5em',
  },
  introText: {
    maxWidth: '40em',
    padding: '.5em',
  },
  introButtons: {
    marginTop: '1em',
  },
  projectSection: {
    marginTop: '5em',
  },
}));

export default useStyles;
