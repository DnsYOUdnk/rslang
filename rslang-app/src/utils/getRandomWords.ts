import { IWord } from './../types/dataWordTypes';

const LEARN_WORD_QUANTITY = 1;
const TRANSLATE_WORDS_QUANTITY = 4;
const FIRST_ELEMENT = 0;

const getRandomIndex = (words: IWord[]) => {
  return Math.floor(Math.random() * words.length);
};

export const getRandomWord = (words: IWord[]): IWord => {
  const randomIndex = getRandomIndex(words);
  return words.splice(randomIndex, LEARN_WORD_QUANTITY)[FIRST_ELEMENT];
};

export const getRandomWords = (words: IWord[]): IWord[] => {
  if (words.length <= TRANSLATE_WORDS_QUANTITY) {
    return JSON.parse(JSON.stringify(words));
  }

  const randomIndex = getRandomIndex(words);
  if (randomIndex > words.length - TRANSLATE_WORDS_QUANTITY) {
    return words.slice(words.length - TRANSLATE_WORDS_QUANTITY, words.length);
  }
  return words.slice(randomIndex, randomIndex + TRANSLATE_WORDS_QUANTITY);
};
