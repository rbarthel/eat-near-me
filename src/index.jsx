// require("../styles/application.scss");

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import search from './redux/search';

import App from './App.jsx';

const store = createStore(search);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('react-root'));
