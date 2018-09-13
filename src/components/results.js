import * as React from 'react';

import Button from '@material-ui/core/Button';
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

function Score({ questions, answers }) {
  // Find questions where user gave the answer
  const correctAnswers = questions.filter((q, idx) => {
    return q.correct_answer === answers[idx];
  });

  return (
    <div>
      {correctAnswers.length} / {questions.length}
    </div>
  );
}

export default function Results({ quiz, history }) {
  // Questions with their respective answers
  const QA = quiz.questions.map((q, idx) => {
    return {
      ...q,
      answer: quiz.answers[idx],
    };
  });

  return (
    <div>
      <div>
        Final Score: <Score questions={quiz.questions} answers={quiz.answers} />
      </div>
      <List dense={true}>
        {QA.map(qa => (
          <QuestionResult question={qa} />
        ))}
      </List>
      <Button onClick={() => history.push('/')}> Go Back Home</Button>
    </div>
  );
}
