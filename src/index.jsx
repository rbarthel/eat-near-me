// require("../styles/application.scss");

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk'

import reducers from './redux/reducers';
import App from './App.jsx';

const store = createStore(reducers,
  compose(applyMiddleware(thunkMiddleware)
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

ReactDOM.render(
  <Provider store={ store }>
    <App />
  </Provider>, document.getElementById('react-root'));
