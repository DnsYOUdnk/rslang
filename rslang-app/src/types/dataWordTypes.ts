export interface IWord {
  id: string;
  group: 0;
  page: 0;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
  correctAnswer?: boolean;
  userWord?: IUserWord;
  _id?: string;
}

export interface IUserWord {
  difficulty: string;
  optional: {
    countCorrectSeries: number;
    numberUses: number;
    countLearn: number;
    isWordLearned: boolean;
  };
  id?: string;
  wordId?: string;
}

export interface ILocalDataWords {
  [key: number]: {
    [key: number]: IWord[];
  };
}
