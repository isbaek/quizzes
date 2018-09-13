import * as React from 'react';
import LinearProgress from '@material-ui/core/LinearProgress';

import Question from './question';

class Quiz extends React.Component {
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

  render() {
    const { questions, answers } = this.props.quiz;
    return (
      <div>
        <LinearProgress variant="determinate" value={this.quizProgress()} />
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
