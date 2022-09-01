import { IWord } from './../types/dataWordTypes';

const LEARN_WORD_QUANTITY = 1;
const TRANSLATE_WORDS_QUANTITY = 4;

const getRandomIndex = (words: IWord[]) => {
  return Math.floor(Math.random() * words.length);
}

export const getRandomWord = (words: IWord[]): IWord[] => {
  const randomIndex = getRandomIndex(words)
  return words.splice(randomIndex, LEARN_WORD_QUANTITY);
}

export const getRandomWords = (words: IWord[]): IWord[] => {
  const randomIndex = getRandomIndex(words)
  return words.slice(randomIndex, randomIndex + TRANSLATE_WORDS_QUANTITY);
}