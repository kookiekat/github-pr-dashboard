import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from './components/Main';
import { loadPullRequestsFromSearch } from './actions';
import config from '../config/config.json';
import configureStore from './store';

import '../css/main.scss';

config.repos = config.repos.sort();

const store = configureStore();

// store.dispatch(loadPullRequests(undefined));
store.dispatch(loadPullRequestsFromSearch());

ReactDOM.render(
  <Provider store={store}>
    <Main />
  </Provider>,
  document.getElementById('app')
);

