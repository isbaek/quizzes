import * as React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { TrackCategory, TrackDifficulty, TrackAmount, TrackType } from '../actions/quiz';
import CATEGORIES from '../constants/categories';
import { dispatch } from 'rxjs/internal/observable/range';

function Picker({ title, help, value, values, names, onChange }) {
  return (
    <FormControl>
      <InputLabel shrink htmlFor="age-label-placeholder">
        {title}
      </InputLabel>
      <Select value={value} onChange={onChange} displayEmpty name="age">
        {values.map((v, idx) => (
          <MenuItem value={v}>{names ? names[idx] : v}</MenuItem>
        ))}
      </Select>
      <FormHelperText>{help}</FormHelperText>
    </FormControl>
  );
}

class Home extends React.Component {
  render() {
    const { amount, category, difficulty, dispatch, type } = this.props;

    return (
      <div className="home">
        <form autoComplete="off">
          <Picker
            title="Category"
            help="Type of questions you want to see"
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
            title="Types"
            help="True/False or MultiChoise"
            value={type}
            values={['any', 'boolean', 'multiple']}
            names={['All Questions', 'True or False', 'Multiple Choice']}
            onChange={event => {
              dispatch(
                TrackType({
                  type: event.target.value,
                })
              );
            }}
          />
        </form>
      </div>
    );
  }
}

export default Home;
