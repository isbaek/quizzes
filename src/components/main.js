import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
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
          <div className="main">
            <Route path="/" component={Home} />
            <Route path="/quiz/:id" component={Quiz} />
            <Route path="/results" component={Results} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default Main;
