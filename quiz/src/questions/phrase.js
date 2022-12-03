import axios from "axios";

// --------------------------------------------------
// Handling the phrases array
// --------------------------------------------------

// return all phrases from a list that are made up of 2 words
function getTwoWordPhrases(phrases) {
  // TODO
}

// return all phrases from a list that are made up of 3 words
function getThreeWordPhrases(phrases) {
  // TODO
}

// returns a random "count" number of phrases from a list
function getRandomSetOfPhrases(phrases, count) {
  // TODO
}

// --------------------------------------------------
// Constructing and modifying phrases
// --------------------------------------------------

// get an array of the words that make up a phrase
function getWords(phrase) {
  return phrase.split(" ");
}

// takes a phrase and rewrites it in kebab-case
function createKebabStylePhrase(phrase) {
  const words = getWords(phrase);
  var finalPhrase = words.shift();
  for (var word in words) {
    finalPhrase += "-" + word;
  }
  return finalPhrase;
}

// takes a phrase and rewrites it in camelCase
function createCamelStylePhrase(phrase) {
  var words = getWords(phrase);
  var finalPhrase = words.shift();
  for (var word in words) {
    finalPhrase += word.charAt(0).toUpperCase() + str.slice(1);
  }
  return finalPhrase;
}

// takes a full phrase and rewrites it in the given style
export function stylePhrase(phrase, style) {
  return style === "kebab"
    ? createKebabStylePhrase(phrase)
    : createCamelStylePhrase(phrase);
}

// calculates the edit distance between two strings, ie, the minimum number of
// single-character edits required to change one string into the other
// source: https://www.tutorialspoint.com/levenshtein-distance-in-javascript
function computeEditDistance(str1, str2) {
  const track = Array(str2.length + 1)
    .fill(null)
    .map(() => Array(str1.length + 1).fill(null));
  for (let i = 0; i <= str1.length; i += 1) {
    track[0][i] = i;
  }
  for (let j = 0; j <= str2.length; j += 1) {
    track[j][0] = j;
  }
  for (let j = 1; j <= str2.length; j += 1) {
    for (let i = 1; i <= str1.length; i += 1) {
      const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  return track[str2.length][str1.length];
}

// get a random integer between 0 and max (exclusive)
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// modify one of the words (if specified, the one at "index") that make up a
// given phrase the modified word is "editDistance" changes away from the original
// if "editDistance" is not set, the distance between the words is random
function getPhraseVariation(phrase, index = null, editDistance = null) {
  var words = getWords(phrase);
  const targetWordIdx = index || getRandomInt(words.length);
  var targetWord = words[targetWordIdx];
  const url =
    "api.datamuse.com/words?" +
    (targetWord.length < 5 ? "sl=" : "sp=") +
    targetWord;
  axios.get(url).then((response) => {
    var candidates = response.slice(0, 30); // get first 30 answers
    candidates.sort((a, b) => 0.5 - Math.random()); // shuffle them

    if (!editDistance) return candidates[0];

    // if editDistance set, look for candidate that satisfies it
    for (let i = 0; i < candidates.length; i++) {
      var candidateWord = candidates[i];
      if (computeEditDistance(candidateWord, targetWord) == editDistance) {
        words[targetWordIdx] = candidateWord;
        break;
      }
    }

    // reconstruct phrase as a single string
    var newPhrase = words.shift();
    for (var word in words) {
      newPhrase += " " + word;
    }
    return newPhrase;
  });
}
