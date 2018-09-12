import * as React from 'react';
import unescape from 'unescape';
import shuffle from 'shuffle-array';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

function cleanQ(str) {
  return unescape(str).replace('&#039;', "'");
}

export default function Question(props) {
  const { type } = props.question;
  if (type === 'multiple') {
    return <QuestionMulti {...props} />;
  } else if (type === 'boolean') {
    return <QuestionSingle {...props} />;
  }
  return <div>Unsupported question type</div>;
}

function QuestionMulti({ num, question, onAnswer }) {
  const possibleAnswers = shuffle([question.correct_answer, ...question.incorrect_answers]);
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Question {num}
        </Typography>
        <Typography component="p">{cleanQ(question.question)}</Typography>
      </CardContent>
      <List>
        {possibleAnswers.map(a => (
          <ListItem button>
            <ListItemText primary={a} onClick={() => onAnswer(a)} />
          </ListItem>
        ))}
      </List>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onAnswer('blablabla')}>
          Skip
        </Button>
      </CardActions>
    </Card>
  );
}

function QuestionSingle({ num, question, onAnswer }) {
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="headline" component="h2">
          Question 1
        </Typography>
        <Typography component="p">{cleanQ(question.question)}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" onClick={() => onAnswer('True')}>
          True
        </Button>
        <Button size="small" color="primary" onClick={() => onAnswer('False')}>
          False
        </Button>
      </CardActions>
    </Card>
  );
}
