import * as React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
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

// Selection picker allows you to pick a value from a list of things
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

Picker.propTypes = {
  title: PropTypes.string,
  help: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  values: PropTypes.array,
  names: PropTypes.array,
  onChange: PropTypes.func,
};

class Home extends React.Component {
  static propTypes = {
    dispatch: PropTypes.func,
    category: PropTypes.object,
    difficulty: PropTypes.string,
    amount: PropTypes.string,
    type: PropTypes.string,
    history: PropTypes.object,
  };

  onSubmit = e => {
    const { dispatch, category, difficulty, amount, type } = this.props;
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
    const { amount, category, difficulty, dispatch, type } = this.props;

    return (
      <div className="home">
        <Header />
        <h2 className="heading-title"> Quiz Whiz Application</h2>
        <p className="heading-subtitle">
          Customize your questions or start playing right away. Can you score 100%?
        </p>
        <div className="wrapper">
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
          <div className="studying-wrapper">
            <img className="studying-image" src="/studying.svg" alt="studying" />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
