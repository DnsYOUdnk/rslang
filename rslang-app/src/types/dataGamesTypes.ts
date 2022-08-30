export interface ILinksDataGames {
  audiocall: LinksGameElement;
  sprint: LinksGameElement;
}

export type LinksGameElement = {
  link: string;
  text: string;
  img: string;
  description: string;
  id: number;
  class?: string;
}