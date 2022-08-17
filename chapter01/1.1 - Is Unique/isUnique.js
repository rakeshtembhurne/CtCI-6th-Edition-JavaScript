const { repeatedTest, curry } = require("../../lib/test");

function isUniqueByBruteForce(string) {
  for (let i = 0; i < string.length; i++) {
    for (let j = i + 1; j < string.length; j++) {
      if (string[i] === string[j]) {
        return false;
      }
    }
  }
  return true;
}

function isUniqueByBitwiseOp(str, indexOffset = "a".charCodeAt()) {
  let counterTable = Number();
  for (let index of [...str].map((c) => c.charCodeAt() - indexOffset)) {
    const mask = 1 << index;
    if (counterTable & mask) return false;
    counterTable |= mask;
  }
  return true;
}

function isUniqueByHashTable(str) {
  let obj = {};
  for (let i = 0; i < str.length; i++) {
    if (obj[str[i]] && obj[str[i]] >= 1) {
      return false;
    } else {
      obj[str[i]] = 1;
    }
  }
  return true;
}

function hasUniqueCharactersSet(str) {
  let chars = new Set();

  for (let i = 0; i < str.length; ++i) {
    if (chars.has(str[i])) {
      return false;
    }
    chars.add(str[i]);
  }
  return true;
}

function hasUniqueCharactersSort(str) {
  // sort string using quicksort
  const strArray = str.split("");
  strArray.sort();

  for (var i = 1; i < strArray.length; ++i) {
    if (strArray[i] === strArray[i - 1]) {
      return false;
    }
  }
  return true;
}

const testCases = [
  { input: ["abcd"], output: true },
  { input: ["abccd"], output: false },
  { input: ["bhjjb"], output: false },
  { input: ["mdjq"], output: true },
  { input: ["someblablablablalargetesttocheck"], output: false },
];

repeatedTest("isUniqueByBruteForce", isUniqueByBruteForce, testCases);
repeatedTest("isUniqueByBitwiseOp", isUniqueByBitwiseOp, testCases);
repeatedTest("isUniqueByHashTable", isUniqueByHashTable, testCases);
repeatedTest("hasUniqueCharactersSet", hasUniqueCharactersSet, testCases);
const results = repeatedTest(
  "hasUniqueCharactersSort",
  hasUniqueCharactersSort,
  testCases
);

console.table(results);
