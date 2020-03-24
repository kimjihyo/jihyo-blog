import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import { ThemeProvider, createMuiTheme } from '@material-ui/core';
import { common, red } from '@material-ui/core/colors';
import App from './components/App';
import store from './store/store';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: common.black,
    },
    secondary: {
      main: '#7CFC00',
    },
    text: {
      secondary: '#7CFC00',
    },
  },
  typography: {
    fontFamily: 'Inconsolata',
  },
});

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
