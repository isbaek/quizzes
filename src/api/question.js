export default function fetchQuestions({ category, difficulty, amount, type }) {
  let categoryParams = '';
  if (category !== 'any') {
    categoryParams = `&category${category}`;
  }
  return fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}${categoryParams}`
  ).then(res => res.json());
}
