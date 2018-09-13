import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

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
        <Typography ariant="headline" component="h2">
          Quiz Started on: {moment(quiz.startedAt).format('MMMM Do YYYY, h:mm:ss a')}
        </Typography>
        <Typography component="p">
          You scored: {`${correctAnswers.length} / ${quiz.questions.length}`}
        </Typography>
        <Link to={`/results/${quiz.id}`}>Go to review -></Link>
      </CardContent>
    </Card>
  );
}

class Review extends React.Component {
  render() {
    const { quizzes } = this.props;
    const quizList = quizzes && quizzes.length > 4 ? quizzes.slice(0, 4) : quizzes;
    return (
      <div className="review">
        <Header />
        <Grid container className="review-container" spacing={24}>
          {quizList.map((q, idx) => {
            return (
              <Grid item spacing={24} xs={12} sm={6}>
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
