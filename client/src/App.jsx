import React, { Component } from 'react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Typekit from 'react-typekit';
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';

import './App.scss';
import Container from './components/Container';

const reducer = combineReducers(
  Object.assign({}, require('./reducers'))
);

let middlewares = [thunk];
if (process.env.NODE_ENV !== 'production') {
  let logger = require('redux-logger');
  middlewares = [ ...middlewares, logger.createLogger()];
}
const store = compose(applyMiddleware(...middlewares))(createStore)(reducer);

class App extends Component {
  state = {
    response: '',
  };

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Container />
        </Provider>
        <Typekit kitId="yfs1mos" />
      </div>
    );
  }
}

export default App;
