

export const playSoundEffects = (onMute: boolean, correctAnswer?: boolean) => {
  const soundPlayer = new Audio();
  if (!onMute) {
    switch (correctAnswer) {
      case false:
        soundPlayer.src = '/sound-effects/incorrect_answer-1.mp3';
        break;
      case true:
        soundPlayer.src = '/sound-effects/correct_answer.mp3';
        break;
      default:
        soundPlayer.src = '/sound-effects/click.mp3';
        break;
    }
    soundPlayer.play();
  }
};
