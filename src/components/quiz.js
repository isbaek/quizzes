import * as React from 'react';
import Question from './question';

class Quiz extends React.Component {
  currentQuestion() {
    const { questions, answers } = this.props.quiz;
    return questions[answers.length];
  }

  questionNum() {
    return this.props.quiz.answers.length + 1;
  }

  render() {
    const { questions, answers } = this.props.quiz;
    return (
      <div>
        <Question
          num={this.questionNum()}
          question={this.currentQuestion()}
          onAnswer={this.props.onAnswer}
        />
      </div>
    );
  }
}

export default Quiz;
