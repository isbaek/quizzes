import {
  START_QUIZ,
  ERR_QUIZ,
  DELETE_QUIZ,
  FINISH_QUIZ,
  ANSWER_QUESTION,
  TRACK_CATEGORY,
  TRACK_DIFFICULTY,
  TRACK_AMOUNT,
  TRACK_TYPE,
} from '../actions/quiz';

// Read from local storage if there are existing saved quizzes
function getCachedOptions() {
  try {
    const cachedOptions = JSON.parse(localStorage.getItem('quizzes'));
    return cachedOptions;
  } catch (error) {
    return null;
  }
}

const INITIAL_STATE = {
  quizzes: getCachedOptions() || [],
  amount: '10',
  difficulty: 'medium',
  category: {
    name: 'All Categories',
    value: 'any',
  },
  type: 'boolean',
  error: null,
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

// Main reducer function
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
    case DELETE_QUIZ:
      return {
        ...state,
        quizzes: state.quizzes.filter(q => q.id !== action.payload.id),
      };
    case ERR_QUIZ:
      return {
        ...state,
        error: action.payload.error,
      };
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
