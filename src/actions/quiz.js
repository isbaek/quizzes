import uuid from 'uuid/v4';

import fetchQuestions from '../api/question';

// Action Types
export const START_QUIZ = 'START_QUIZ';
export const ERR_QUIZ = 'ERR_QUIZ';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const DELETE_QUIZ = 'DELETE_QUIZ';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const TRACK_CATEGORY = 'TRACK_CATEGORY';
export const TRACK_DIFFICULTY = 'TRACK_DIFFICULTY';
export const TRACK_AMOUNT = 'TRACK_AMOUNT';
export const TRACK_TYPE = 'TRACK_TYPE';

// Action Creators

// Starts a new quiz
export function StartNewQuiz({ category, difficulty, amount, type }) {
  return async function(dispatch) {
    try {
      // Fetch questions depending on user selections
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

// User finishes a quiz
export function FinishQuiz({ id }) {
  return {
    type: FINISH_QUIZ,
    payload: {
      id,
      finishedAt: Date.now(),
    },
  };
}

// User navigates away from a quiz and doesn't complete it
export function DeleteQuiz({ id }) {
  return {
    type: DELETE_QUIZ,
    payload: {
      id,
    },
  };
}

// User answers a question to a quiz
export function AnswerQuestion({ id, answer }) {
  return {
    type: ANSWER_QUESTION,
    payload: {
      id,
      answer,
    },
  };
}

// Track user selected category
export function TrackCategory({ category }) {
  return {
    type: TRACK_CATEGORY,
    payload: {
      category,
    },
  };
}

// Track user selected difficulty
export function TrackDifficulty({ difficulty }) {
  return {
    type: TRACK_DIFFICULTY,
    payload: {
      difficulty,
    },
  };
}

// Track user selected amount
export function TrackAmount({ amount }) {
  return {
    type: TRACK_AMOUNT,
    payload: {
      amount,
    },
  };
}

// Track user selected type
export function TrackType({ type }) {
  return {
    type: TRACK_TYPE,
    payload: {
      type,
    },
  };
}

// Save quiz to local storage so we can fetch it later
export function saveQuizzes(quizzes) {
  return localStorage.setItem('quizzes', JSON.stringify(quizzes));
}
