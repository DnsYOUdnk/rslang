import { IOptional, IOptionStatistic } from '../types/dataStatisticTypes';

export const defaultOptional = {
  learnedWords: 0,
  newWords: 0,
  procCorrectWord: 0,
  bestSeries: 0,
};

export const getDefaultObjStatistic = () => {
  const DEFAULT_STATISTIC = {
    learnedWords: 0,
    optional: {},
  } as { learnedWords: number; optional: IOptional };
  const arrStat = ['commonData', 'audiocall', 'sprint'];
  const date = new Date().toLocaleDateString();
  arrStat.forEach((gameName) => {
    const objStat = {} as { [key: string]: IOptionStatistic };
    objStat[date] = JSON.parse(JSON.stringify(defaultOptional));
    DEFAULT_STATISTIC.optional[gameName] = objStat;
  });
  return DEFAULT_STATISTIC;
};
