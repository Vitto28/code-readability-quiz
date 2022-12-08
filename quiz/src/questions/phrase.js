import axios from "axios";

// shuffles the order of the elements inside a list/array
export function shuffle(list) {
  for (let i = list.length - 1; i >= 1; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // 0 <= j <= i
    let temp = list[j];
    list[j] = list[i];
    list[i] = temp;
  }
}

// --------------------------------------------------
// Handling the phrases array
// --------------------------------------------------

// returns an array of all phrases in the given list whose word count equals "count"
function getAllPhrasesOfLength(phrases, count) {
  return phrases.filter((phrase) => phrase.split(" ").length === count);
}

// returns a random "count" number of phrases from the given list
// each half consist of 2 or 3 length phrases, respectively
// count must be an even positive integer
export function getRandomSetOfPhrases(phrases, count) {
  // length 2
  var lengthTwo = getAllPhrasesOfLength(phrases, 2);
  shuffle(lengthTwo); // shuffle order
  var lengthTwo = lengthTwo.slice(0, count / 2); // get half of our answers from here

  // length 3
  var lengthThree = getAllPhrasesOfLength(phrases, 3);
  shuffle(lengthThree); // shuffle order
  var lengthThree = lengthThree.slice(0, count / 2); // get the other half

  var allPhrases = lengthTwo.concat(lengthThree);
  shuffle(allPhrases);

  return allPhrases;
}

// --------------------------------------------------
// Constructing and modifying phrases
// --------------------------------------------------

// get an array of the words that make up a phrase
export function getWords(phrase) {
  return phrase.split(" ");
}

// takes a phrase and rewrites it in kebab-case
function createKebabStylePhrase(phrase) {
  const words = getWords(phrase);
  var finalPhrase = words.shift();
  for (let i = 0; i < words.length; i++) {
    finalPhrase += "-" + words[i];
  }
  return finalPhrase;
}

// takes a phrase and rewrites it in camelCase
function createCamelStylePhrase(phrase) {
  var words = getWords(phrase);
  var finalPhrase = words.shift();
  for (let i = 0; i < words.length; i++) {
    finalPhrase += words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }
  return finalPhrase;
}

// takes a full phrase and rewrites it in the given style
export function stylePhrase(phrase, style) {
  if (style === "kebab") {
    return createKebabStylePhrase(phrase);
  } else if (style === "camel") {
    return createCamelStylePhrase(phrase);
  } else {
    return null;
  }
}

// computes numOfVariations number of variations of a single phrase,
// returning the resulting new phrases as an array
export async function getPhraseVariations(phrase, numOfVariations) {
  var newPhrases = [];
  var numOfWords = getRandomInt(getWords(phrase).length);

  while (newPhrases.length < numOfVariations) {
    const idx = getRandomInt(numOfWords);
    // NOTE: Currently, setting editDistance severely hinders
    // application response time for some phrases, so for the time being,
    // leave it as null (or dont pass it at all)
    const editDistance = null;
    var potentialPhrase = await computePhraseVariation(
      phrase,
      idx,
      editDistance
    );
    if (!newPhrases.includes(potentialPhrase)) {
      // add new phrase to list ONLY IF it is not already in it
      newPhrases.push(potentialPhrase);
    }
  }

  return new Promise((resolve, reject) => resolve(newPhrases));
}

// modifies the given phrase by modifying one of the words that make it up
// the new phrase is "editDistance" (if specified) single character edits
// from the original, otherwise, the distance is random
// NOTE: Currently, setting editDistance severely hinders application response
// time, so for the time being,  leave it as null when you call this function
async function computePhraseVariation(
  phrase,
  index = null,
  editDistance = null
) {
  var words = getWords(phrase);
  const targetWordIdx = index || getRandomInt(words.length);
  var targetWord = words[targetWordIdx];

  var badSpelledLike = ["unique", "reload", "update", "open"];

  var params = {};
  if (targetWord.length < 5 || badSpelledLike.includes(targetWord)) {
    params.sl = targetWord;
  } else {
    params.sp = targetWord;
  }

  return new Promise((resolve, reject) => {
    axios
      .get("https://api.datamuse.com/words", { params })
      .then((response) => {
        var candidates = response.data.slice(0, 31); // get first 30 answers
        candidates.shift(); // remove first result
        shuffle(candidates); // shuffle them

        if (!editDistance) {
          words[targetWordIdx] = cleanString(
            candidates[getRandomInt(candidates.length)].word
          );
        } else {
          // look for candidate that satisfies it
          for (let i = 0; i < candidates.length; i++) {
            var candidateWord = candidates[i].word;
            if (
              computeEditDistance(candidateWord, targetWord) == editDistance
            ) {
              words[targetWordIdx] = cleanString(candidateWord);
              break;
            }
          }
        }
        // reconstruct phrase as a single string
        var newPhrase = words.shift();
        for (let i = 0; i < words.length; i++) {
          newPhrase += " " + words[i];
        }

        return resolve(newPhrase);
      })
      .catch((error) => {
        console.log("An error ocurred during axios request");
        console.log(error);
        return reject(error);
      });
  });
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
export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// removes numbers, whitespaces, and special characters from a string
function cleanString(str) {
  return str.replace(/[^a-zA-Z]/g, "");
}
