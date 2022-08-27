export const getDataGames = (audio: string, sprint: string) => {
  const links = [
    { 
      link: '/games/audiocall',
      class: audio,
      text: 'Аудиовызов',
      img: '/public/icons/audio.svg',
      description:
        `Игра Аудиовызов поможет вам развить навыки аудирования и перевода.
        Выбирай правильный перевод озвученного слова.`,
      id: 2 },
    { 
      link: '/games/sprint',
      class: sprint,
      text: 'Спринт',
      img: '/public/icons/sprint.svg',
      description: 
        `Игра Спринт поможет вам научиться быстро переводить слова на ваш родной язык.
        Укажи правильный перевод слова или нет.`,
      id: 3 }
  ]

  return links;
};
