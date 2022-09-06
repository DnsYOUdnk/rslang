const BASE_URL = 'https://react-learn-language.herokuapp.com/';

export const audioPlayer = new Audio();

export const playAudioWord = (url: string): void => {
  audioPlayer.src = BASE_URL + url;
  audioPlayer.load();
  audioPlayer.play();
};
