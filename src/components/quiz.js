import * as React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';
import LinearProgress from '@material-ui/core/LinearProgress';

import Header from './header';
import Question from './question';

class Quiz extends React.Component {
  static propTypes = {
    quiz: PropTypes.object,
  };

  currentQuestion() {
    const { questions, answers } = this.props.quiz;
    return questions[answers.length];
  }

  questionNum() {
    return this.props.quiz.answers.length + 1;
  }

  quizProgress() {
    const { questions, answers } = this.props.quiz;
    return 100 * (answers.length / questions.length);
  }

  componentWillUnmount() {
    const { questions, answers } = this.props.quiz;
    if (questions.length - answers.length > 1) {
      this.props.onDelete();
    }
  }

  render() {
    return (
      <div className="quiz">
        <Prompt
          when={true}
          message="Are you sure you want to exit? This will erase your current progresss!"
        />
        <Header />
        <LinearProgress
          className="linear-progress"
          variant="determinate"
          value={this.quizProgress()}
        />

        <div className="section">
          <Question
            num={this.questionNum()}
            question={this.currentQuestion()}
            onAnswer={this.props.onAnswer}
          />
        </div>
      </div>
    );
  }
}

export default Quiz;
