import React from 'react';
import {
  Switch, Route, Redirect, Link,
} from 'react-router-dom';
import {
  AppBar,
  Button,
  Toolbar,
  Container,
  Typography,
  useMediaQuery,
  Drawer,
} from '@material-ui/core';
import AboutPage from '../AboutPage';
import useStyles from './style';
import Footer from '../Footer';
import StoryPage from '../StoryPage';
import StoryEditor from '../StoryEditor';
import LoginAlertDialog from './LoginAlertDialog';
import { useStoreState, useStoreActions } from '../../hooks';
import {
  checkIfValidUser,
  checkIfRootUser,
  startFirebaseAuthChangeListener,
  signOut,
} from '../../firebase/auth';
import StoryList from '../StoryList';
import HomePage from '../HomePage';

const App: React.FC = () => {
  const classes = useStyles();
  const isNotMobile = useMediaQuery('(min-width:600px)');
  const isWideScreen = useMediaQuery('(min-width:1100px)');
  const userInfo = useStoreState((state) => state.userSession.user);
  const clearUserSession = useStoreActions(
    (state) => state.userSession.clearUserSession,
  );
  const setUser = useStoreActions((state) => state.userSession.setUser);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);
  const [currentPage, setCurrentPage] = React.useState<string>('Home');

  const handleSignInDialogOpen = React.useCallback(() => {
    setDialogOpen(true);
  }, [setDialogOpen]);

  const handleSignInDialogClose = React.useCallback(() => {
    setDialogOpen(false);
  }, [setDialogOpen]);

  const handleSignOut = React.useCallback(() => {
    signOut();
  }, []);

  React.useEffect(() => {
    const onSignIn = (user: firebase.User) => {
      setUser({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });
    };
    const onSignOut = () => {
      clearUserSession();
    };
    startFirebaseAuthChangeListener(onSignIn, onSignOut);
  }, [setUser, clearUserSession]);

  return (
    <div className="App">
      <div className={classes.root}>
        {isWideScreen ? (
          <Drawer
            className={classes.drawer}
            anchor="left"
            variant="permanent"
            classes={{ paper: classes.drawerPaper }}
          >
            <div className={classes.blogTitleContainerInDrawer}>
              <Typography variant="h6" className={classes.blogTitleInDrawer}>
                Jihyo Kim
                <br />
                <span className={classes.jobTitle}>Software Developer</span>
              </Typography>
            </div>
            <Button
              classes={{
                root: classes.drawerButton,
                label:
                  currentPage === 'Home'
                    ? classes.selectedButtonLabel
                    : classes.defaultButtonLabel,
              }}
              onClick={() => setCurrentPage('Home')}
              disableRipple
              component={Link}
              to="/"
            >
              Home
            </Button>
            <Button
              classes={{
                root: classes.drawerButton,
                label:
                  currentPage === 'About'
                    ? classes.selectedButtonLabel
                    : classes.defaultButtonLabel,
              }}
              onClick={() => setCurrentPage('About')}
              disableRipple
              component={Link}
              to="/about"
            >
              About
            </Button>
            <Button
              classes={{
                root: classes.drawerButton,
                label:
                  currentPage === 'Archives'
                    ? classes.selectedButtonLabel
                    : classes.defaultButtonLabel,
              }}
              onClick={() => setCurrentPage('Archives')}
              disableRipple
              component={Link}
              to="/archives"
            >
              Archives
            </Button>
            <Button
              classes={{
                root: classes.drawerButton,
                label: classes.defaultButtonLabel,
              }}
              disableRipple
            >
              Email
            </Button>
            <Button
              classes={{
                root: classes.drawerButton,
                label: classes.defaultButtonLabel,
              }}
              disableRipple
            >
              LinkedIn
            </Button>
            <Button
              classes={{
                root: classes.drawerButton,
                label: classes.defaultButtonLabel,
              }}
              disableRipple
            >
              Github
            </Button>
          </Drawer>
        ) : (
          <AppBar className={classes.appBar} position="static" elevation={0}>
            <Toolbar>
              <Typography
                className={classes.blogTitle}
                variant={isNotMobile ? 'h5' : 'caption'}
                color="inherit"
              >
                Jihyo Kim
              </Typography>
              <Button
                classes={{
                  root: classes.appBarButton,
                  label:
                    currentPage === 'Home'
                      ? classes.selectedButtonLabel
                      : classes.defaultButtonLabel,
                }}
                disableRipple
                onClick={() => setCurrentPage('Home')}
                component={Link}
                to="/"
              >
                Home
              </Button>
              <Button
                classes={{
                  root: classes.appBarButton,
                  label:
                    currentPage === 'About'
                      ? classes.selectedButtonLabel
                      : classes.defaultButtonLabel,
                }}
                onClick={() => setCurrentPage('About')}
                disableRipple
                component={Link}
                to="/about"
              >
                About
              </Button>
              {checkIfRootUser(userInfo) && (
                <Button
                  classes={{ root: classes.appBarButton }}
                  disableRipple
                  component={Link}
                  to="/create"
                >
                  Create
                </Button>
              )}
              {checkIfValidUser(userInfo) ? (
                <Button
                  disableRipple
                  classes={{
                    root: classes.appBarButton,
                    label: classes.defaultButtonLabel,
                  }}
                  color="inherit"
                  onClick={handleSignOut}
                >
                  Sign Out
                </Button>
              ) : (
                <Button
                  disableRipple
                  classes={{
                    root: classes.appBarButton,
                    label: classes.defaultButtonLabel,
                  }}
                  color="inherit"
                  onClick={handleSignInDialogOpen}
                >
                  Sign In
                </Button>
              )}
              <LoginAlertDialog
                open={dialogOpen}
                onClose={handleSignInDialogClose}
              />
            </Toolbar>
          </AppBar>
        )}
      </div>

      <Container
        maxWidth="md"
        className={
          isWideScreen ? classes.wideScreenContainer : classes.container
        }
      >
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/stories">
            <StoryPage />
          </Route>
          <Route exact path="/about">
            <AboutPage />
          </Route>
          <Route exact path="/archives">
            <StoryList />
          </Route>
          {checkIfRootUser(userInfo) && (
            <Route exact path="/create">
              <StoryEditor editorType="createNew" />
            </Route>
          )}
          {checkIfRootUser(userInfo) && (
            <Route exact path="/edit">
              <StoryEditor editorType="edit" />
            </Route>
          )}
          <Redirect to="/" />
        </Switch>
        <Footer />
      </Container>
    </div>
  );
};

export default App;
