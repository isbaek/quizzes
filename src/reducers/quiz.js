// Action Types

import {
  START_QUIZ,
  FINISH_QUIZ,
  ANSWER_QUESTION,
  TRACK_CATEGORY,
  TRACK_DIFFICULTY,
  TRACK_NUM_Q,
} from '../actions/quiz';

const quizReducer = (state = {}, action) => {
  switch (action.type) {
    case START_QUIZ:
      return {
        quizzes: state.quizzes ? state.quizzes.concat(action.payload) : [].concat(action.payload),
      };
    case FINISH_QUIZ:
      return {
        quizzes: state.quizzes.forEach(q => {
          if (q.id === action.payload.id) {
            return {
              ...q,
              finishedAt: action.payload.finishedAt,
            };
          }
        }),
      };
    case ANSWER_QUESTION:
      return {
        quizzes: state.quizzes.forEach(q => {
          if (q.id === action.payload.id) {
            return {
              ...q,
              answers: q.answers
                ? q.answers.concat(action.payload.answer)
                : [].concat(action.payload.answer),
            };
          }
        }),
      };
    case TRACK_CATEGORY:
      return {
        category: action.payload.category,
      };
    case TRACK_DIFFICULTY:
      return {
        difficulty: action.payload.difficulty,
      };
    case TRACK_NUM_Q:
      return {
        amount: action.payload.amount,
      };
    default:
      return state;
  }
};

export default quizReducer;
