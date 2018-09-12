import { connect } from 'react-redux';

import { nextQuestion, prevQuestion, checkAnswer } from '../actions/quiz';
import Main from '../components/main';

const mapStateToProps = ({ quizzes, category, difficulty, amount }) => ({
  quizzes,
  category,
  difficulty,
  amount,
});

// const mapDispatchToProps = {
//   nextQuestion,
//   prevQuestion,
//   checkAnswer,
//   getQuestions
// };

export default connect(mapStateToProps)(Main);
