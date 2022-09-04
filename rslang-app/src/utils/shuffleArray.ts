import { IWord } from './../types/dataWordTypes';

export const shuffleArray = (arr: IWord[]) => {
  if (!arr) return;
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
};
