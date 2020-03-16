import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '35em',
    margin: '0 auto',
  },
  title: {},
  category: {
    margin: '0 1em',
    color: theme.palette.secondary.light,
  },
  created: {
    color: 'gray',
  },
  listLabel: {
    marginBottom: '.5em',
  },
}));

export default useStyles;
