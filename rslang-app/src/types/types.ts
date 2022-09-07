export type UserWord = {
  difficulty: string;
  optional: {
    countCorrectSeries?: number; // счетчик для обработки слова в игре, нужен для того чтобы юзер три раза подряд в игре выбирал слово для пометки что оно изучено, если хоть раз ошибся оно сбрасывается и по новой
    numberUses?: number; // количество раз когда слово вообще было использовано и с ошибками и без
    countLearn?: number; // счетчик сколько раз пользователь выбирал правильный ответ
    isWordLearned?: boolean; //  изучено ли слово или нет
    //[key: string]: unknown;
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
