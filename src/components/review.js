import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Header from './header';
import Typography from '@material-ui/core/Typography';

function ReviewCard({ quiz }) {
  const correctAnswers = quiz.questions.filter((q, idx) => {
    return q.correct_answer === quiz.answers[idx];
  });
  return (
    <Card className="review-card">
      <CardContent>
        <Typography ariant="headline" component="h2" gutterBottom>
          Quiz Started on: {moment(quiz.startedAt).format('MMM Do YY, h:mm a')}
        </Typography>
        <Typography component="p" gutterBottom>
          You scored: {`${correctAnswers.length} / ${quiz.questions.length}`}
        </Typography>
        <Link className="review-link" to={`/results/${quiz.id}`}>
          <Button size="small" variant="contained" color="secondary">
            Go to review
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

class Review extends React.Component {
  render() {
    const { quizzes } = this.props;
    if (!quizzes || quizzes.length <= 0) {
      return (
        <div className="review">
          <Header />
          Add in review
        </div>
      );
    }
    const quizList = quizzes && quizzes.length > 4 ? quizzes.slice(0, 4) : quizzes;
    return (
      <div className="review">
        <Header />
        <Grid container className="review-container" spacing={16}>
          {quizList.map((q, idx) => {
            return (
              <Grid item sm={6}>
                <ReviewCard quiz={q} key={idx} />
              </Grid>
            );
          })}
        </Grid>
      </div>
    );
  }
}

export default Review;
