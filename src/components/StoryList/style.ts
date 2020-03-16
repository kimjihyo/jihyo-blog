import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    maxWidth: '35em',
    margin: '0 auto',
  },
  title: {},
  category: {
    margin: '0 1em',
    color: 'gray',
    fontWeight: 'bold',
  },
  created: {
    color: 'gray',
  },
  listLabel: {
    marginBottom: '.5em',
  },
});

export default useStyles;
