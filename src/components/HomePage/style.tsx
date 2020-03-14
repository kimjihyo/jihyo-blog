import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    '& .MuiButtonBase-root': {
      margin: '.5em',
    },
  },
  title: {
    marginBottom: '1em',
  },
});

export default useStyles;
