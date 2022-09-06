export interface IStatistic {
  id?: string,
  learnedWords: number,
  optional: IOptional
}

export interface IOptional {
  [key: string]: {
    [key: string]: IOptionStatistic
  }
}

export interface IOptionStatistic {
  learnedWords: number,
  newWords: number,
  procCorrectWord: number,
  bestSeries: number
}