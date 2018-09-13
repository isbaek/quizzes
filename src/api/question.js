import clean from '../utils/cleanText';

// Fetch the API from DB
export default function fetchQuestions({ category, difficulty, amount, type }) {
  let categoryParams = '';
  if (category !== 'any') {
    categoryParams = `&category${category}`;
  }
  return (
    fetch(
      `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}${categoryParams}`
    )
      .then(res => res.json())
      // Cleanup HTML entities in text (so we don't have to clean it elsewhere)
      .then(data => ({
        ...data,
        results: data.results.map(r => ({
          ...r,
          question: clean(r.question),
          correct_answer: clean(r.correct_answer),
          incorrect_answers: r.incorrect_answers.map(clean),
        })),
      }))
  );
}
