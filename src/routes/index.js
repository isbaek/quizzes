import * as React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import store from '../reducers';
import Quiz from '../components/quiz';
import Home from '../components/home';
import Results from '../components/results';

import { AnswerQuestion } from '../actions/quiz';

function mapStateToProps(state) {
  const { quizzes, category, difficulty, amount, type } = state.quizReducer;
  return {
    quizzes,
    category,
    difficulty,
    amount,
    type,
  };
}

function wrap(component) {
  const wrapped = connect(mapStateToProps)(component);
  return wrapped;
}

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/quiz/:id" component={wrap(QuizRoute)} />
            <Route path="/results/:id" component={wrap(ResultsRoute)} />
            <Route path="/" component={wrap(Home)} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

function QuizNotFound({ id }) {
  return (
    <div>
      <h2>No such quiz: {id}</h2>
    </div>
  );
}

class QuizRoute extends React.Component {
  currentQuiz() {
    // Get router & state from props
    const { match, quizzes } = this.props;
    // Quiz ID (from router params)
    const { id } = match.params;
    // Find matching quiz
    return quizzes.filter(q => q.id === id)[0];
  }

  onAnswer = answer => {
    this.props.dispatch(
      AnswerQuestion({
        id: this.currentQuiz().id,
        answer,
      })
    );
  };

  render() {
    const quiz = this.currentQuiz();

    // No quiz
    if (!quiz) {
      return <Redirect to="/" />;
    }

    // Quiz is finished
    if (quiz.finishedAt) {
      return <Redirect to={`/results/${quiz.id}`} />;
    }

    return <Quiz quiz={quiz} onAnswer={this.onAnswer} />;
  }
}

function ResultsRoute(props) {
  // Get router & state from props
  const { match, quizzes } = props;
  // Quiz ID (from router params)
  const { id } = match.params;
  // Find matching quiz
  const quiz = quizzes.filter(q => q.id === id)[0];

  return <Results quiz={quiz} history={props.history} />;
}

export default Main;
