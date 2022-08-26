export const getDataGames = (audio: string, sprint: string) => {
  const links = [
    { link: '/games/audio', class: audio, text: 'Аудиовызов', id: 2 },
    { link: '/games/sprint', class: sprint, text: 'Спринт', id: 3 }
  ]

  return links;
};
