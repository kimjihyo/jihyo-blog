import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import App from './components/App';
import store from './store/store';

ReactDOM.render(
  <StoreProvider store={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);
