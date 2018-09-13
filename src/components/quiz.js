import * as React from 'react';
import PropTypes from 'prop-types';
import { Prompt } from 'react-router-dom';

import Header from './header';
import Question from './question';

class Quiz extends React.Component {
  static propTypes = {
    quiz: PropTypes.object,
    onAnswer: PropTypes.func,
  };

  // Get the current question
  currentQuestion() {
    const { questions, answers } = this.props.quiz;
    return questions[answers.length];
  }

  // Question number
  questionNum() {
    return this.props.quiz.answers.length + 1;
  }

  // Destory quiz when a user leaves unfinished
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
