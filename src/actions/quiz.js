import uuid from 'uuid/v4';

import fetchQuestions from '../api/question';

// Action Types
export const START_QUIZ = 'START_QUIZ';
export const FINISH_QUIZ = 'FINISH_QUIZ';
export const ANSWER_QUESTION = 'ANSWER_QUESTION';
export const TRACK_CATEGORY = 'TRACK_CATEGORY';
export const TRACK_DIFFICULTY = 'TRACK_DIFFICULTY';
export const TRACK_AMOUNT = 'TRACK_AMOUNT';

// Action Creators
export async function StartNewQuiz({ category, difficulty, amount, type }) {
  const questions = await fetchQuestions({
    category,
    difficulty,
    amount,
    type,
  });

  return {
    type: START_QUIZ,
    payload: {
      id: uuid(),
      questions,
      answers: [],
      startedAt: Date.now(),
      finishedAt: null,
      category,
      difficulty,
      amount,
      type,
    },
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
    type: TRACK_DIFFICULTY,
    payload: {
      amount,
    },
  };
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
