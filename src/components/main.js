import * as React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from '../reducers';
import Quiz from '../components/quiz';
import Home from '../components/home';
import Results from '../components/results';

class Main extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path="/quiz/:id" component={QuizRoute} />
            <Route path="/results" component={Results} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </Provider>
    );
  }
}

function QuizRoute(props, ctx) {
  const { match } = props;
  return (
    <div>
      <h2>{match.params.id}</h2>
      <pre>
        <code>{JSON.stringify(ctx, null, 4)}</code>
      </pre>
    </div>
  );
}

export default Main;
