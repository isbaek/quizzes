// Action Types

import {
  START_QUIZ,
  FINISH_QUIZ,
  ANSWER_QUESTION,
  TRACK_CATEGORY,
  TRACK_DIFFICULTY,
  TRACK_AMOUNT,
} from '../actions/quiz';

const INITIAL_STATE = {
  quizzes: [
    {
      id: 'test',
      questions: [
        {
          category: 'Entertainment: Film',
          type: 'boolean',
          difficulty: 'easy',
          question: 'Shaquille O&#039;Neal appeared in the 1997 film &quot;Space Jam&quot;.',
          correct_answer: 'False',
          incorrect_answers: ['True'],
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'medium',
          question: 'What was the main currency in Club Penguin?',
          correct_answer: 'Coins',
          incorrect_answers: ['Stamps', 'Tickets', 'Gems'],
        },
        {
          category: 'Entertainment: Video Games',
          type: 'multiple',
          difficulty: 'medium',
          question: 'Which of these characters is NOT a boss in Crash Bash?',
          correct_answer: 'Ripper Roo',
          incorrect_answers: ['Papu Papu', 'Komodo brothers', 'Nitros Oxide'],
        },
      ],
      answers: [],
      startedAt: Date.now(),
      finishedAt: null,
    },
  ],
  amount: 10,
  difficulty: 'medium',
  category: 'any',
  type: 'any',
};

const quizReducer = (state = INITIAL_STATE, action) => {
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
        ...state,
        quizzes: state.quizzes.map(q => {
          if (q.id === action.payload.id) {
            return {
              ...q,
              answers: [...q.answers, action.payload.answer],
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
    case TRACK_AMOUNT:
      return {
        amount: action.payload.amount,
      };
    default:
      return state;
  }
};

export default quizReducer;
