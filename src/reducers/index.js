import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import quizReducer from './quiz';
import { saveQuizzes } from '../actions/quiz';
// Needed for redux dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    quizReducer,
  }),
  composeEnhancers(applyMiddleware(thunk))
);

store.subscribe(() => {
  const state = store.getState().quizReducer.quizzes;

  // Persist quizzes in local storage
  saveQuizzes(state);
});

export default store;
