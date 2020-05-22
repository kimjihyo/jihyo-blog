import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
  introImage: {
    objectFit: 'scale-down',
    width: '30%',
    marginRight: '10%',
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
    width: '80%',
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
