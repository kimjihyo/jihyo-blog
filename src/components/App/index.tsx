import React from 'react';
import {
  Switch, Route, Redirect, Link,
} from 'react-router-dom';
import {
  Tabs,
  Tab,
  AppBar,
  Button,
  Typography,
  Toolbar,
  Container,
} from '@material-ui/core';
import { createBrowserHistory } from 'history';
import HomePage from '../HomePage';
import AboutPage from '../AboutPage';
import useStyles from './style';
import { BLOG_NAME } from '../../blog_configs';
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

const tabsIndices: { [key: string]: number } = {
  '/': 0,
  '/about': 1,
  '/create': 1,
};

const App: React.FC = () => {
  const classes = useStyles();
  const history = createBrowserHistory();
  const userInfo = useStoreState((state) => state.userSession.user);
  const clearUserSession = useStoreActions(
    (state) => state.userSession.clearUserSession,
  );
  const setUser = useStoreActions((state) => state.userSession.setUser);
  const [value, setValue] = React.useState(
    tabsIndices[history.location.pathname] || 0,
  );
  const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

  const handleChange = (_: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleSignInDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleSignInDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSignOut = () => {
    signOut();
  };

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
        <AppBar position="static">
          <Toolbar variant="dense">
            <Typography className={classes.title} variant="h6">
              {BLOG_NAME}
            </Typography>
            <Tabs
              className={classes.tabs}
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
            >
              <Tab label="Home" component={Link} to="/" />
              {/* <Tab label="About me" component={Link} to="/about" /> */}
              {checkIfRootUser(userInfo) && (
                <Tab label="Create" component={Link} to="/create" />
              )}
            </Tabs>
            {checkIfValidUser(userInfo) ? (
              <Button
                className={classes.signInButton}
                color="inherit"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            ) : (
              <Button
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
