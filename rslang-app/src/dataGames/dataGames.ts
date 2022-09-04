import { ILinksDataGames } from '../types/dataGamesTypes';

export const DATA_GAMES: ILinksDataGames = {
  audiocall: {
    link: '/games/audiocall',
    text: 'Аудиовызов',
    img: '/public/icons/audio.svg',
    description: `Игра Аудиовызов поможет вам развить навыки аудирования и перевода.
      Выбирай правильный перевод озвученного слова.`,
    id: 2,
  },
  sprint: {
    link: '/games/sprint',
    text: 'Спринт',
    img: '/public/icons/sprint.svg',
    description: `Игра Спринт поможет вам научиться быстро переводить слова на ваш родной язык.
      Укажи правильный перевод слова или нет.`,
    id: 3,
  },
};

export const getDataGames = (audio: string, sprint: string) => {
  DATA_GAMES.audiocall.class = audio;
  DATA_GAMES.sprint.class = sprint;

  const links = Object.values(DATA_GAMES);

  return links;
};
