export interface ContextInterface {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
}

export type Resp = {
  id: string;
  learnedWords: number;
  optional: Optional;
};

type Optional = {
  commonData: Data;
  audiocall: Data;
  sprint: Data;
};

export type Data = {
  [key: string]: GameData;
};

type GameData = {
  newWords: number;
  procCorrectWord: number;
  bestSeries: number;
  learnedWords: number;
};
