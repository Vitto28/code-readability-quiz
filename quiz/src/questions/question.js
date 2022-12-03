import phrases from "./phrases";
import { stylePhrase, getRandomSetOfPhrases } from "./phrase";

// takes a given phrase and generates a question with "numOfAnswers"
// possible answers in the given style (kebab or camel)
function createQuestion(phrase, style, numOfAnswers = 4) {
  // a question is composed of:
  // - phrase: original phrase
  // - answers: 4 options
  var answers = [];
  const correctAnswer = stylePhrase(phrase, style);
  answers.push(correctAnswer);

  // create numOfAnswers - 1 wrong answers
  numOfAnswers--;
  for (let i = 0; i < numOfAnswers; i++) {}
}

// creates a "count" number of quiz questions
function createQuizQuestions(count) {
  const phrases = getRandomSetOfPhrases(phrases, count);
  // TODO
}
