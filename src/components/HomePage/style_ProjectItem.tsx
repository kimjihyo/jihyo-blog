import { makeStyles } from '@material-ui/core/styles';
import RED from '../colors';

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
  firstColumn: {
    width: '40%',
    marginRight: '10%',
  },
  dividerRow: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
  },
  divider: {
    height: 1,
    backgroundColor: 'LightGrey',
    marginBottom: '1em',
  },
  mobileSectionNumber: {
    fontWeight: 'bold',
    fontSize: 28,
    color: 'LightGrey',
  },
  sectionNumber: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'LightGrey',
  },
  textArea: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '50%',
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
  },
  mobileName: {
    fontWeight: 'bold',
    fontSize: '18px',
  },
  description: {
    marginTop: '.5em',
  },
  position: {
    color: RED,
    fontWeight: 'bold',
    fontSize: '12px',
  },
  mobilePosition: {
    color: RED,
    fontWeight: 'bold',
    fontSize: '10px',
  },
  mobileDescription: {
    fontSize: '12px',
    marginTop: '.5em',
  },
}));

export default useStyles;
