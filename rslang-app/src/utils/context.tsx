import React from 'react';
import { ContextInterface, Resp } from '../types/statisticType';

export const Context = React.createContext<ContextInterface | null>(null);

const statistic = {
  id: '631418bf88b69cf71d43a47e',
  learnedWords: 0,
  optional: {
    commonData: {
      '05.09.2022': {
        newWords: 0,
        procCorrectWord: 0,
        learnedWords: 0,
      },
    },
    audiocall: {
      '05.09.2022': {
        newWords: 0,
        procCorrectWord: 0,
        bestSeries: 0,
      },
    },
    sprint: {
      '05.09.2022': {
        newWords: 0,
        procCorrectWord: 0,
        bestSeries: 0,
      },
    },
  },
};

export const ContextStatistic = React.createContext<Resp>(statistic);
