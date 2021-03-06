// @flow
/* eslint-disable no-underscore-dangle */
import { applyMiddleware, createStore, compose } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import type { Store } from '../types';

// We are checking if window is available before using it.
// This is needed for universal apps that render the component server side.
// Details: https://github.com/zalmoxisus/redux-devtools-extension#12-advanced-store-setup
const composeEnhancers = typeof window === 'object'
  && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

export default (): Store => createStore(
  reducer,
  composeEnhancers(
    applyMiddleware(
      thunk,
      // debugging logger
      // require('./debug-middleware/log-middleware').default,
      // debugging timer
      // require('./debug-middleware/timing-middleware').default,
      // average action timer
      // require('./debug-middleware/timing-average-middleware').default(20),
    ),
  ),
);
