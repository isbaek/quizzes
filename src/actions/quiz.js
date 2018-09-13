import uuid from 'uuid/v4';

import fetchQuestions from '../api/question';

// Action Types
export const START_QUIZ = 'START_QUIZ';
export const ERR_QUIZ = 'ERR_QUIZ';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const TRACK_CATEGORY = 'TRACK_CATEGORY';
export const TRACK_DIFFICULTY = 'TRACK_DIFFICULTY';
export const TRACK_AMOUNT = 'TRACK_AMOUNT';
export const TRACK_TYPE = 'TRACK_TYPE';

// Action Creators
export function StartNewQuiz({ category, difficulty, amount, type }) {
  return async function(dispatch) {
    try {
      const questions = await fetchQuestions({
        category,
        difficulty,
        amount,
        type,
      });
      return dispatch({
        type: START_QUIZ,
        payload: {
          id: uuid(),
          questions: questions.results,
          answers: [],
          startedAt: Date.now(),
          finishedAt: null,
          category,
          difficulty,
          amount,
          type,
        },
      });
    } catch (error) {
      return dispatch({
        type: ERR_QUIZ,
        payload: {
          error,
        },
      });
    }
  };
}

export function FinishQuiz({ id }) {
  return {
    type: FINISH_QUIZ,
    payload: {
      id,
      finishedAt: Date.now(),
    },
  };
}

export function AnswerQuestion({ id, answer }) {
  return {
    type: ANSWER_QUESTION,
    payload: {
      id,
      answer,
    },
  };
}

export function TrackCategory({ category }) {
  return {
    type: TRACK_CATEGORY,
    payload: {
      category,
    },
  };
}

export function TrackDifficulty({ difficulty }) {
  return {
    type: TRACK_DIFFICULTY,
    payload: {
      difficulty,
    },
  };
}

export function TrackAmount({ amount }) {
  return {
    type: TRACK_AMOUNT,
    payload: {
      amount,
    },
  };
}
export function TrackType({ type }) {
  return {
    type: TRACK_TYPE,
    payload: {
      type,
    },
  };
}

export function saveQuizzes(quizzes) {
  return localStorage.setItem('quizzes', JSON.stringify(quizzes));
}
// CONTINUE_QUIZ
// START_NEW_QUIZ
// ANSWER_CURRENT_QUESTION
// FINISH_QUIZ
// TRACK_FAVORITE_CATEGORY
// TRACK_FAVORITE_CATEGORY
// User {
//     Quizzes [
//         {
//         id
//         []Questions //
//         []Answers
//         Diff
//             StartedAt
//             FinishedAt
//         }
//     ]
//     FavoriteCategory
//     FavoriteDifficulty
// }
