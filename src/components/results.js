import * as React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';

function QuestionResult({ question }) {
  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar>
          <FolderIcon />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={question.question}
        secondary={question.answer ? question.answer : 'No answer'}
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
