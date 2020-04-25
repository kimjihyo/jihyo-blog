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
  const userInfo = useStoreState((state) => state.userSession.user);
  const clearUserSession = useStoreActions(
    (state) => state.userSession.clearUserSession,
  );
  const setUser = useStoreActions((state) => state.userSession.setUser);
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);


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
        <AppBar className={classes.appBar} position="static" elevation={0}>
          <Toolbar>
            <Typography
              className={classes.blogTitle}
              variant="h5"
              color="inherit"
            >
              Jihyo Kim
            </Typography>
            <Button disableRipple component={Link} to="/">
              Home
            </Button>
            <Button disableRipple component={Link} to="/about">
              About
            </Button>
            {/* <Button disableRipple component={Link} to="/archives">
              Archives
            </Button> */}
            {checkIfRootUser(userInfo) && (
              <Button disableRipple component={Link} to="/create">
                Create
              </Button>
            )}
            {checkIfValidUser(userInfo) ? (
              <Button
                disableRipple
                className={classes.signInButton}
                color="inherit"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
                disableRipple
                className={classes.signInButton}
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
      </div>

      <Container maxWidth="md" className={classes.container}>
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
      </Container>

      <Footer />
    </div>
  );
};

export default App;
