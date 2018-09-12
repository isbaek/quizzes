import * as React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import store from '../reducers';
import Quiz from '../components/quiz';
import Home from '../components/home';
import Results from '../components/results';

import { AnswerQuestion } from '../actions/quiz';

function mapStateToProps(state) {
  const { quizzes, category, difficulty, amount } = state.quizReducer;
  return {
    quizzes,
    category,
    difficulty,
    amount,
  };
}

// const mapDispatchToProps = {
//   nextQuestion,
//   prevQuestion,
//   checkAnswer,
//   getQuestions
// };

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
            <Route path="/results/:id" component={wrap(Results)} />
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

function QuizRoute(props, ctx) {
  // Get router & state from props
  const { match, quizzes } = props;
  // Quiz ID (from router params)
  const { id } = match.params;
  // Find matching quiz
  const quiz = quizzes.filter(q => q.id === id)[0];

  if (!quiz) {
    return <QuizNotFound id={id} />;
  }

  const onAnswer = answer =>
    props.dispatch(
      AnswerQuestion({
        id,
        answer,
      })
    );

  return (
    <div>
      <Quiz quiz={quiz} onAnswer={onAnswer} />
    </div>
  );
}

function ResultsRoute(props, ctx) {
  // Get router & state from props
  const { match, quizzes } = props;
  // Quiz ID (from router params)
  const { id } = match.params;
  // Find matching quiz
  const quiz = quizzes.filter(q => q.id === id)[0];

  return <Results quiz={quiz} />;
}

export default Main;
