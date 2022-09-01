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
import { shuffleArray } from '../../../utils/shuffleArray';
import { IWord } from '../../../types/dataWordTypes';
import { getRandomWord, getRandomWords } from '../../../utils/getRandomWords';

const BASE_URL = 'https://react-learn-language.herokuapp.com/';

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const {words} = props;
  const [startGame, setStartGame] = useState(false);
  const [onSound, setOnSound] = useState(false);
  const [onPlayWord, setOnPlayWord] = useState(false);
  const [wordLearn, setWordLearn] = useState<IWord[]>([]);
  const [translateWordsArr, setTranslateWordsArr] = useState<IWord[]>([]);
  const al = useRef(null);

  const audioPlayer = new Audio();

  useEffect(() => {
    shuffleArray(words as IWord[]);
  }, [ words ])

  useEffect(() => {
    if(!wordLearn.length && words) {
      const randomLearnWord = getRandomWord(words);
      const randomTranslateWords = getRandomWords(words);
      const translateWords = randomLearnWord.concat(randomTranslateWords)
      shuffleArray(translateWords);
      setWordLearn(randomLearnWord)
      setTranslateWordsArr(translateWords)
    }
  }, [ words, wordLearn ])

  const playAudioWord = (url: string): void => {
    setOnPlayWord(!onPlayWord)
    audioPlayer.src = BASE_URL + url;
    audioPlayer.play();
  }

  audioPlayer.addEventListener('ended',() => {
    setOnPlayWord(false)
  })

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnPlayWord(start);
    playAudioWord(wordLearn[0].audio)
  }

  const handlerSoundChange = () => {
    setOnSound(!onSound);
  }

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {1} countDownHandler={countDownHandler}/>}
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
          onClick={() => !onPlayWord && playAudioWord(wordLearn[0].audio)}
        >
          <Lottie
            className={cn(className, cl.word_player)}
            animationData={soundOn}
            loop={onPlayWord}
            autoplay={onPlayWord}
            title={'Воспроизвести слово'}
          />
        </div>
        <ul className={cn(className, cl.translation_words)}>
          {translateWordsArr.map((word, index) => (
            <li 
              className="audiocall__transition__word"
              key={`btn_word-${index}`}
              onClick={() => console.log(word)}>
              <Button 
                className={cn(cl.button__translation_word)}>
                {word.wordTranslate}
              </Button>
            </li>
          ))}
        </ul>
        <div className="audiocall__button">
          <Button className={cn(cl.button__next)}>Не знаю</Button>
        </div>
      </div>
    </div>
  </>
};