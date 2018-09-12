import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import quizReducer from './quiz';
// Needed for redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  combineReducers({
    quizReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);
