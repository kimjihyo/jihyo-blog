import React from 'react';
import {
  Switch, Route, Redirect, Link,
} from 'react-router-dom';
import {
  Tabs,
  Tab,
  AppBar,
  Button,
  Toolbar,
  Container,
  Typography,
} from '@material-ui/core';
import { createBrowserHistory } from 'history';
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

const tabsIndices: { [key: string]: number } = {
  '/about': 0,
  '/archives': 1,
  '/create': 2,
};

const App: React.FC = () => {
  const classes = useStyles();
  const history = createBrowserHistory();
  const userInfo = useStoreState((state) => state.userSession.user);
  const clearUserSession = useStoreActions(
    (state) => state.userSession.clearUserSession,
  );
  const setUser = useStoreActions((state) => state.userSession.setUser);
  const [tabIndex, setTabIndex] = React.useState(
    tabsIndices[history.location.pathname] || 0,
  );
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleChange = React.useCallback(
    (_: React.ChangeEvent<{}>, newValue: number) => {
      setTabIndex(newValue);
    },
    [setTabIndex],
  );

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
        <div className={classes.line}>{}</div>
        <AppBar className={classes.appBar} position="static" elevation={0}>
          <Toolbar>
            <Typography
              className={classes.blogTitle}
              variant="h4"
              color="inherit"
            >
              김지효 블로그
            </Typography>
            <LoginAlertDialog
              open={dialogOpen}
              onClose={handleSignInDialogClose}
            />
          </Toolbar>
        </AppBar>
        <Tabs
          className={classes.tabs}
          value={tabIndex}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
        >
          <Tab
            disableRipple
            label="About me"
            component={Link}
            to="/about"
          />
          <Tab
            disableRipple
            label="Archives"
            component={Link}
            to="/archives"
          />
          {checkIfRootUser(userInfo) && (
          <Tab
            disableRipple
            label="Create"
            component={Link}
            to="/create"
          />
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
        </Tabs>
      </div>

      <Container maxWidth="md" className={classes.container}>
        <Switch>
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
          <Route exact path="/">
            <Redirect to="/about" />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Container>

      <Footer />
    </div>
  );
};

export default App;
