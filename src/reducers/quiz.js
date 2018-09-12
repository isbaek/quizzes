// Action Types

import {
  START_QUIZ,
  FINISH_QUIZ,
  ANSWER_QUESTION,
  TRACK_CATEGORY,
  TRACK_DIFFICULTY,
  TRACK_AMOUNT,
  TRACK_TYPE,
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
      answers: ['True', 'Coins'],
      startedAt: Date.now(),
      finishedAt: null,
    },
  ],
  amount: '10',
  difficulty: 'medium',
  category: {
    name: 'All Categories',
    value: 'any',
  },
  type: 'any',
};

// updateQuiz makes it easy to update a specific quiz in the state
function updateQuiz(state, id, quizMap) {
  return {
    ...state,
    quizzes: state.quizzes.map(q => {
      // Transform matching quiz
      if (q.id === id) {
        return quizMap(q);
      }
      // Leave others unchanged
      return q;
    }),
  };
}

const quizReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_QUIZ:
      return {
        ...state,
        quizzes: [action.payload, ...state.quizzes],
      };
    case FINISH_QUIZ:
      return updateQuiz(state, action.payload.id, q => ({
        ...q,
        finishedAt: action.payload.finishedAt,
      }));
    case ANSWER_QUESTION:
      return updateQuiz(state, action.payload.id, q => {
        // Automatically mark as finished if we have all our answers
        const isFinished = q.answers.length + 1 >= q.questions.length;
        return {
          ...q,
          finishedAt: isFinished ? Date.now() : null,
          answers: [...q.answers, action.payload.answer],
        };
      });
    case TRACK_CATEGORY:
      return {
        ...state,
        category: action.payload.category,
      };
    case TRACK_DIFFICULTY:
      return {
        ...state,
        difficulty: action.payload.difficulty,
      };
    case TRACK_AMOUNT:
      return {
        ...state,
        amount: action.payload.amount,
      };
    case TRACK_TYPE:
      return {
        ...state,
        type: action.payload.type,
      };
    default:
      return state;
  }
};

export default quizReducer;
