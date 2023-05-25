import { IWord } from './../types/dataWordTypes';

const LEARN_WORD_QUANTITY = 1;
const FIRST_ELEMENT = 0;

const getRandomIndex = (words: IWord[]) => {
  return Math.floor(Math.random() * words.length);
};

export const getRandomWord = (words: IWord[]): IWord => {
  const randomIndex = getRandomIndex(words);
  return words.splice(randomIndex, LEARN_WORD_QUANTITY)[FIRST_ELEMENT];
};

export const getRandomWords = (words: IWord[], qantityGetWords: number): IWord[] => {
  if (words.length <= qantityGetWords) {
    return JSON.parse(JSON.stringify(words));
  }

  const randomIndex = getRandomIndex(words);
  if (randomIndex > words.length - qantityGetWords) {
    return words.slice(words.length - qantityGetWords, words.length);
  }
  return words.slice(randomIndex, randomIndex + qantityGetWords);
};
