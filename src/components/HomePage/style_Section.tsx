import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
  },
  title: {
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: '18px',
  },
  line: {
    height: 3,
    backgroundColor: 'black',
    marginTop: '.5em',
  },
}));

export default useStyles;
