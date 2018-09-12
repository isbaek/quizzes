import * as React from 'react';
import Question from './question';

function Score({ questions, answers }) {
  // Find questions where user gave the answer
  const correctAnswers = questions.filter((q, idx) => {
    return q.correct_answer === answers[idx];
  });

  return (
    <div>
      {correctAnswers.length} / {questions.length}
    </div>
  );
}

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
