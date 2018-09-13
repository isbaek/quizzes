import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

import Header from './header';

// Icon to show correctness
function GoodIcon() {
  return (
    <Avatar style={{ background: '#4CAF50' }}>
      <DoneAllIcon />
    </Avatar>
  );
}

// Icon to show incorrectness
function BadIcon() {
  return (
    <Avatar style={{ background: '#E53935' }}>
      <ErrorIcon />
    </Avatar>
  );
}

// Individual result component
function QuestionResult({ question }) {
  const isCorrect = question.answer === question.correct_answer;

  return (
    <ListItem>
      <ListItemAvatar>{isCorrect ? <GoodIcon /> : <BadIcon />}</ListItemAvatar>
      <ListItemText
        className="results-text"
        primary={question.question}
        secondary={
          question.answer ? `${question.answer} - (${question.correct_answer})` : 'No answer'
        }
      />
    </ListItem>
  );
}

QuestionResult.propTypes = {
  question: PropTypes.object,
};

export default function Results({ quiz, history }) {
  // Questions with their respective answers
  const QA = quiz.questions.map((q, idx) => {
    return {
      ...q,
      answer: quiz.answers[idx],
    };
  });

  // Get correct answers by comparing with user defined answers
  const correctAnswers = quiz.questions.filter((q, idx) => {
    return q.correct_answer === quiz.answers[idx];
  });

  return (
    <div className="results">
      <Header />
      <div className="results-list">
        <List dense={true}>
          <ListItemText
            className="results-text"
            primary={`Your score: ${correctAnswers.length} / ${quiz.questions.length}`}
          />
          {QA.map((qa, idx) => (
            <QuestionResult key={idx} question={qa} />
          ))}
        </List>
      </div>
      <Button variant="contained" color="secondary" onClick={() => history.push('/')}>
        Go back Home
      </Button>
    </div>
  );
}

Results.propTypes = {
  quiz: PropTypes.object,
  history: PropTypes.object,
};
