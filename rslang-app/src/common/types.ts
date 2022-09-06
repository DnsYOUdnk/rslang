export type UserWord = {
  difficulty: string;
  optional: {
    [key: string]: unknown;
  };
  id?: string;
  wordId?: string;
};

export type Word = {
  id: string;
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord?: UserWord;
};

export type AgregatedWords = [
  {
    paginatedResults: Word[];
    totalCount: [{ count: number }];
  },
];

export type WordsDayData = {
  newWordsQuantity: number;
  learnedWordsQuantity: number;
  rightAnswersPercent: number;
};

export type GameDayData = {
  newWordsQuantity: number;
  rightAnswers: number;
  wrongAnswers: number;
  responsesSeries: number;
  gamesCounter: number;
};

export type GameDayStatistic = {
  date?: string;
  newWordsQuantity?: number;
  rightAnswers?: number;
  wrongAnswers?: number;
  responsesSeries?: number;
  gamesCounter?: number;
};

export type UserData = {
  token: string;
  id: string;
};

export type UserStatistics = {
  learnedWords: number;
  optional?: {
    games?: {
      [key: string]: {
        [key: string]: GameDayData;
      };
    };
    words?: {
      [key: string]: WordsDayData;
    };
  };
  id?: string;
};
