// require("../styles/application.scss");

import React from 'react';
import ReactDOM from 'react-dom';

import { createStore } from 'redux';
import { Provider } from 'react-redux';

import search from './redux/search';

import App from './App.jsx';

const store = createStore(search, {
  // location: sessionStorage.lat !== undefined ? [Number(sessionStorage.lat), Number(sessionStorage.long)] : [],
  params: {
    location: [],
    radius: '10',
    minPrice: '0',
    maxPrice: '4',
    keyword: '',
    openNow: true
  },
  results: [],
  display: {}
}, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('react-root'));
