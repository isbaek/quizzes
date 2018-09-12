import * as React from 'react';
import Card from './card';

class Question extends React.Component {
  state = {
    currentIdx: null,
    currentQ: null,
    questionList: null,
  };
  componentDidMount() {
    this.props.getQuestions();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.questions !== this.props.questions) {
      this.setState({
        questionList: this.props.questions,
        currentIdx: 0,
        currentQ: this.props.questions[0],
      });
    }
  }

  calculateScore = answer => {
    if (answer === this.state.currentQ.correct_answer) {
      this.props.checkAnswer(this.props.user.score ? this.props.user.score + 1 : 1);
    } else {
      this.props.checkAnswer(
        this.props.user.score,
        this.props.user.failed
          ? this.props.user.failed.concat(this.state.currentQ.id)
          : [].concat(this.state.currentQ.id)
      );
    }
  };

  onNext = answer => {
    this.setState({
      currentQ: this.state.questionList[this.state.currentIdx + 1],
      currentIdx: this.state.currentIdx + 1,
    });
    this.calculateScore(answer);
  };

  render() {
    if (!this.state.questionList) {
      return <div>Loading</div>;
    }

    if (this.state.currentIdx === this.state.questionList.length - 1) {
      return (
        <div>
          ended Your score is {this.props.user.score} / {this.state.questionList.length}
        </div>
      );
    }

    return (
      <div>
        <Card {...this.state.currentQ} next={this.onNext} />
      </div>
    );
  }
}

export default Question;
