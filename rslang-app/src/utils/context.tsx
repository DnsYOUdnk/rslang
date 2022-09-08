import React from 'react';
import { ContextInterface, Resp } from '../types/statisticType';
import { getTodayData } from './getTodayData';

export const Context = React.createContext<ContextInterface | null>(null);

const today = getTodayData();

const statistic = {
  id: '631418bf88b69cf71d43a47e',
  learnedWords: 0,
  optional: {
    commonData: {
      [today]: {
        newWords: 0,
        procCorrectWord: 0,
        learnedWords: 0,
        bestSeries: 0,
      },
    },
    audiocall: {
      [today]: {
        newWords: 0,
        procCorrectWord: 0,
        learnedWords: 0,
        bestSeries: 0,
      },
    },
    sprint: {
      [today]: {
        newWords: 0,
        procCorrectWord: 0,
        learnedWords: 0,
        bestSeries: 0,
      },
    },
  },
};

export const ContextStatistic = React.createContext<Resp>(statistic);
