export default function fetchQuestions({ category, difficulty, amount, type }) {
  return fetch(
    `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}&category=${category}`
  ).then(res => res.json());
}
