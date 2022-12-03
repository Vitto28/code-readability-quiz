import phrases from "./phrases";
import { stylePhrase } from "./phrase";

// takes a given phrase and generates a question with "numOfAnswers"
// possible answers in the given style (kebab or camel)
function createQuestion(phrase, style, numOfAnswers) {
  // a question is composed of:
  // - phrase: original phrase
  // - answers: 4 options
  var answers = [];
  const correctAnswer = stylePhrase(phrase, style);
  answers.push(correctAnswer);

  for (let i = 0; i < numOfAnswers; i++) {
    // TODO
  }
}
