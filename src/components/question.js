import * as React from 'react';
import PropTypes from 'prop-types';
import shuffle from 'shuffle-array';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

export default function Question(props) {
  const { type } = props.question;
  if (type === 'multiple') {
    return <QuestionMulti {...props} />;
  } else if (type === 'boolean') {
    return <QuestionSingle {...props} />;
  }
  return <div>Unsupported question type</div>;
}

Question.propTypes = {
  question: PropTypes.object,
};

function QuestionMulti({ num, question, onAnswer }) {
  const possibleAnswers = shuffle([question.correct_answer, ...question.incorrect_answers]);
  return (
    <Card className="question">
      <CardContent>
        <Typography gutterBottom component="p">
          Question {num}
        </Typography>
        <Typography gutterBottom component="p">
          {question.question}
        </Typography>
      </CardContent>
      <List>
        {possibleAnswers.map(a => (
          <ListItem button onClick={() => onAnswer(a)}>
            <ListItemText primary={a} />
          </ListItem>
        ))}
      </List>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onAnswer('blablabla')}
        >
          Skip
        </Button>
      </CardActions>
    </Card>
  );
}

QuestionMulti.propTypes = {
  num: PropTypes.string,
  question: PropTypes.object,
  onAnswer: PropTypes.func,
};

function QuestionSingle({ num, question, onAnswer }) {
  return (
    <Card className="question">
      <CardContent>
        <Typography gutterBottom component="p">
          Question {num}
        </Typography>
        <Typography gutterBottom component="p">
          {question.question}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" variant="contained" color="primary" onClick={() => onAnswer('True')}>
          True
        </Button>
        <Button
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => onAnswer('False')}
        >
          False
        </Button>
      </CardActions>
    </Card>
  );
}

QuestionSingle.propTypes = {
  num: PropTypes.string,
  question: PropTypes.object,
  onAnswer: PropTypes.func,
};
