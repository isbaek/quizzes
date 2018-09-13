import * as React from 'react';

import Header from './header';
import Typography from '@material-ui/core/Typography';

class Error extends React.Component {
  render() {
    return (
      <div className="error">
        <Header />
        <div className="error-content">
          <div className="error-wrapper">
            <img src="/clueless_monkey.svg" alt="clueless-monkey" />
            <Typography variant="headline">Where are you trying to go?</Typography>
          </div>
        </div>
      </div>
    );
  }
}

export default Error;
