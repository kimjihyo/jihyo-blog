import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import App from './components/App';
import store from './store/store';
import firebase from './firebase/config';

const theme = createMuiTheme({
  palette: {
    type: 'light',
  },
});

firebase.firestore().enablePersistence();

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <StoreProvider store={store}>
      <Router>
        <App />
      </Router>
    </StoreProvider>
  </ThemeProvider>,
  document.getElementById('root'),
);
