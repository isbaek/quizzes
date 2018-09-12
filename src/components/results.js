import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import ErrorIcon from '@material-ui/icons/ErrorOutline';

function GoodIcon() {
  return (
    <Avatar style={{ background: '#4CAF50' }}>
      <DoneAllIcon />
    </Avatar>
  );
}

function BadIcon() {
  return (
    <Avatar style={{ background: '#E53935' }}>
      <ErrorIcon />
    </Avatar>
  );
}

function QuestionResult({ question }) {
  const isCorrect = question.answer === question.correct_answer;

  return (
    <ListItem>
      <ListItemAvatar>{isCorrect ? <GoodIcon /> : <BadIcon />}</ListItemAvatar>
      <ListItemText
        primary={question.question}
        secondary={
          question.answer ? `${question.answer} - (${question.correct_answer})` : 'No answer'
        }
      />
    </ListItem>
  );
}

export default function Results({ quiz }) {
  // Questions with their respective answers
  const QA = quiz.questions.map((q, idx) => {
    return {
      ...q,
      answer: quiz.answers[idx],
    };
  });

  return (
    <div>
      <List dense={true}>
        {QA.map(qa => (
          <QuestionResult question={qa} />
        ))}
      </List>
    </div>
  );
}
