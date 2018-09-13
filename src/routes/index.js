import * as React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { Provider, connect } from 'react-redux';

import store from '../reducers';
import Quiz from '../components/quiz';
import Home from '../components/home';
import Results from '../components/results';
import Review from '../components/review';
import ErrorPage from '../components/error';

import { AnswerQuestion, DeleteQuiz } from '../actions/quiz';

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

// Connect to redux helper function
function wrap(component) {
  const wrapped = connect(mapStateToProps)(component);
  return wrapped;
}

// Quiz route component where we handle redirects and deletes
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

  // Delete quiz if user navigates away
  onDelete = () => {
    this.props.dispatch(
      DeleteQuiz({
        id: this.currentQuiz().id,
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

    return <Quiz quiz={quiz} onAnswer={this.onAnswer} onDelete={this.onDelete} />;
  }
}

function ResultsRoute(props) {
  // Get router & state from props
  const { match, quizzes } = props;
  // Quiz ID (from router params)
  const { id } = match.params;
  // Find matching quiz
  const quiz = quizzes.filter(q => q.id === id)[0];

  if (!quiz) {
    return <Redirect to="/" />;
  }

  return <Results quiz={quiz} history={props.history} />;
}

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/quiz/:id" component={wrap(QuizRoute)} />
            <Route path="/results/:id" component={wrap(ResultsRoute)} />
            <Route path="/review" component={wrap(Review)} />
            <Route path="/" exact={true} component={wrap(Home)} />
            <Route component={ErrorPage} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}
export default App;
