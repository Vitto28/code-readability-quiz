import {
  stylePhrase,
  getRandomSetOfPhrases,
  getPhraseVariation,
  shuffle,
} from "./phrase";

// takes a given phrase and generates a question with "numOfAnswers"
// possible answers in the given style (kebab or camel)
async function createQuestion(phrase, style, numOfAnswers = 4) {
  var question = {
    phrase: phrase, // original phrase
    options: [], // 4 possible answers (including the correct one)
    solution: null, // index in the array of the correct answer
    selected: null, // answer selected by the user
    time: 0, // time taken to answer the question in seconds
  };
  const correctAnswer = stylePhrase(phrase, style);
  question.options.push(correctAnswer);

  // create numOfAnswers - 1 wrong answers
  numOfAnswers--;
  for (let i = 0; i < numOfAnswers; i++) {
    var variation = await getPhraseVariation(phrase, null, 1);
    question.options.push(stylePhrase(variation, style));
  }
  shuffle(question.options); // shuffle answers

  // get correct solution index
  question.solution = question.options.findIndex((e) => e === correctAnswer);

  return question;
}

// creates a "count" number of quiz questions, each half of a different case style
// count must be an even positive integer
export async function createQuizQuestions(phrases, count) {
  var questions = [];
  const phraseList = getRandomSetOfPhrases(phrases, count);

  // create questions
  for (let i = 0; i < phraseList.length; i++) {
    var phrase = phraseList[i];
    if (i < phraseList.length / 2) {
      var question = await createQuestion(phrase, "kebab");
      questions.push(question);
    } else {
      var question = await createQuestion(phrase, "camel");
      questions.push(question);
    }
  }

  shuffle(questions); // shuffle order of questions
  return questions;
}
