export interface IDataGames {
  audiocall: GameElement;
  sprint: GameElement;
}

export type GameElement = {
  link: string;
  text: string;
  img: string;
  description: string;
  id: number;
  class?: string;
}