import * as React from 'react';
import { Link } from 'react-router-dom';

import QuizIcon from '@material-ui/icons/QuestionAnswer';
import ContactIcon from '@material-ui/icons/ContactSupport';
import ReviewIcon from '@material-ui/icons/RateReview';

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Link className="header-link" to="/">
          QuizWhiz
          <QuizIcon />
        </Link>
        <div className="header-utils">
          <Link className="header-link" title="Review Past Quizzes" to="/review">
            <ReviewIcon />
          </Link>

          <a className="header-link" title="Contact Owner" href="mailto:contact@inseobaek.com">
            <ContactIcon />
          </a>
        </div>
      </div>
    );
  }
}

export default Header;
