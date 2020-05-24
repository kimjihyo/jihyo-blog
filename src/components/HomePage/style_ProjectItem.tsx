import { makeStyles } from '@material-ui/core/styles';
import RED from '../colors';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    padding: '1.5em 1em',
    width: '90%',
    margin: '0 auto',
    marginBottom: '2em',
  },
  line: {
    height: 3,
    backgroundColor: 'grey',
    width: '100%',
  },
  firstColumn: {
    width: '45%',
    marginRight: '10%',
  },
  dividerRow: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1em',
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
  },
  imageArea: {
    width: '45%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingTop: '3em',
  },
  image: {
    objectFit: 'scale-down',
    width: '100%',
    height: '100%',
  },
  mobileImage: {
    objectFit: 'scale-down',
    width: '100%',
    height: '100%',
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
