import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import Header from './header';

import {
  StartNewQuiz,
  TrackCategory,
  TrackDifficulty,
  TrackAmount,
  TrackType,
} from '../actions/quiz';
import CATEGORIES from '../constants/categories';
import { dispatch } from 'rxjs/internal/observable/range';

function Picker({ title, help, value, values, names, onChange }) {
  return (
    <FormControl className="form-control">
      <InputLabel shrink={true} htmlFor="age-label-placeholder">
        {title}
      </InputLabel>
      <Select value={value} onChange={onChange} displayEmpty name="age">
        {values.map((v, idx) => (
          <MenuItem key={idx} value={v}>
            {names ? names[idx] : v}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  );
}

function PastQuiz({ quiz }) {
  console.log('quiz', quiz);
  return (
    <ListItem component="a">
      sjadflksjaflksjlkfsjdlk
      <ListItemText>Quiz {quiz.id}</ListItemText>
      <Button>Review</Button>
    </ListItem>
  );
}

class Home extends React.Component {
  onSubmit = e => {
    const { dispatch, category, difficulty, amount, type, history } = this.props;
    e.preventDefault();
    dispatch(
      StartNewQuiz({
        category: category.value,
        difficulty,
        amount,
        type,
      })
    ).then(res => this.props.history.push(`/quiz/${res.payload.id}`));
  };

  render() {
    const { amount, category, difficulty, dispatch, type, quizzes } = this.props;

    return (
      <div className="home">
        <Header />
        <div className="content">
          <form autoComplete="off" onSubmit={this.onSubmit}>
            <Picker
              key="category"
              title="Category"
              help="Question Category"
              value={category.value}
              values={CATEGORIES.map(c => c.value)}
              names={CATEGORIES.map(c => c.name)}
              onChange={event => {
                const v = event.target.value;
                dispatch(
                  TrackCategory({
                    category: CATEGORIES.filter(c => c.value === v)[0],
                  })
                );
              }}
            />

            <Picker
              key="difficulty"
              title="Difficulty"
              help="Zero or hero ?"
              value={difficulty}
              values={['easy', 'medium', 'hard']}
              names={['Easy', 'Medium', 'Hard']}
              onChange={event => {
                dispatch(
                  TrackDifficulty({
                    difficulty: event.target.value,
                  })
                );
              }}
            />

            <Picker
              key="amount"
              title="Amount"
              help="Short or long ?"
              value={amount}
              values={['10', '20', '50']}
              onChange={event => {
                dispatch(
                  TrackAmount({
                    amount: event.target.value,
                  })
                );
              }}
            />

            <Picker
              key="type"
              title="Types"
              help="True/False or Multiple Choice"
              value={type}
              values={['boolean', 'multiple']}
              names={['True or False', 'Multiple Choice']}
              onChange={event => {
                dispatch(
                  TrackType({
                    type: event.target.value,
                  })
                );
              }}
            />

            <Button type="submit" variant="contained" color="primary">
              Start Quiz
            </Button>
          </form>
        </div>
      </div>
    );
  }
}

export default Home;
