import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '1.5em 1em',
    height: '18em',
    width: '90%',
    margin: '0 auto',
  },
  line: {
    height: 3,
    backgroundColor: 'grey',
    width: '100%',
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '40%',
    marginRight: '10%',
    borderTop: '1',
  },
  imageArea: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '250px',
  },
  mobileImage: {
    objectFit: 'cover',
    width: '100%',
    height: '125px',
  },
  name: {
    fontWeight: 'bold',
    fontSize: '22px',
    marginBottom: '.5em',
  },
  mobileName: {
    fontWeight: 'bold',
    fontSize: '18px',
    marginBottom: '.5em',
  },
  description: {},
  mobileDescription: {
    fontSize: '12px',
  },
}));

export default useStyles;
