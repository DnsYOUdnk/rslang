import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import { GameAudioCallProps } from './GameAudioCallPage.props';
import { CountDown } from '../../../components/CountDown/CountDown';
import { ButtonSound } from '../../../components/ButtonSound/ButtonSound';
import { ButtonFullscreen } from '../../../components/ButtonFullScreen/ButtonFullscreen';
import { Lives } from '../../../components/Lives/Lives';
import { ButtonClose } from '../../../components/ButtonClose/ButtonClose';
import soundOn from './../../../assets/json-animation/soundOn.json';
import { Button } from '../../../components/Button/Button';
import { Button as Btn } from '@mui/material';

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const {words} = props;
  const [startGame, setStartGame] = useState(false);
  const [onSound, setOnSound] = useState(false);
  const [onPlayWord, setOnPlayWord] = useState(false);
  const al = useRef(null);

  const audioPlayer = new Audio();

  const playAudioWord = (): void => {
    setOnPlayWord(!onPlayWord)
    audioPlayer.src = 'https://react-learn-language.herokuapp.com/files/01_0018.mp3';
    audioPlayer.play();
  }

  audioPlayer.addEventListener('ended',() => {
    setOnPlayWord(false)
  })

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnPlayWord(start);
    playAudioWord()
  }

  const handlerSoundChange = () => {
    setOnSound(!onSound);
  }

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {3} countDownHandler={countDownHandler}/>}
    <div className={cn(className, cl.audiocall)}>
      <div className={cl.games_panel}>
        <div className={cn(cl.games__setting, cl.games__setting_left)}>
          <ButtonSound handlerSoundChange={handlerSoundChange} onSound={onSound}/>
          <ButtonFullscreen/>
        </div>
        <div className={cn(cl.games__setting, cl.games__setting_right)}>
          <Lives/>
          <ButtonClose/>
        </div>
      </div>
      <div className={cn(cl.container)}>
        <div 
          className={onPlayWord ? cn(cl.learn_word, cl.enable_play) : cn(cl.learn_word)} 
          onClick={() => !onPlayWord && playAudioWord()}
        >
          <Lottie
            className={cn(className, cl.word_player)}
            animationData={soundOn}
            loop={onPlayWord}
            autoplay={onPlayWord}
            title={'Воспроизвести слово'}
          />
        </div>
        <ul ref={al} className={cn(className, cl.translation_words)} onClick= {() => console.log(words)}>
          <li className="audiocall__transition__word"><Button className={cn(cl.button__translation_word)}>Не знаю</Button></li>
          <li className="audiocall__transition__word"><Button className={cn(cl.button__translation_word)}>Не знаю</Button></li>
          <li className="audiocall__transition__word"><Button className={cn(cl.button__translation_word)}>Не знаю</Button></li>
          <li className="audiocall__transition__word"><Button className={cn(cl.button__translation_word)}>Не знаю</Button></li>
          <li className="audiocall__transition__word"><Button className={cn(cl.button__translation_word)}>Не знаю</Button></li>
        </ul>
        <div className="audiocall__button">
          <Button className={cn(cl.button__next)}>Не знаю</Button>
        </div>
      </div>
    </div>
  </>
};
