import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
const DEFAULT_MAX_LIVES = 5;

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const {words} = props;
  const [wordLearn, setWordLearn] = useState({} as IWord);
  const [translateWordsArr, setTranslateWordsArr] = useState<IWord[]>([]);
  const [startGame, setStartGame] = useState(false);
  const [onSound, setOnSound] = useState(false);
  const [onBlockPlayWord, setOnBlockPlayWord] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [nextWord, setNextWord] = useState(false);
  const [countLives, setCountLives] = useState(DEFAULT_MAX_LIVES);

  const audioPlayer = useMemo(() => new Audio(), []);

  const playAudioWord = useCallback((url: string): void => {
    setOnBlockPlayWord(!onBlockPlayWord)
    audioPlayer.src = BASE_URL + url;
    audioPlayer.play();
  }, [audioPlayer, onBlockPlayWord])
  
  audioPlayer.addEventListener('ended',() => {
    setOnBlockPlayWord(false)
  })

  useEffect(() => {
    if((!wordLearn.id || nextWord) && words && words.length && countLives > 0) {
      const randomLearnWord = getRandomWord(words);
      const randomTranslateWords = getRandomWords(words);
      randomTranslateWords.push(randomLearnWord)
      shuffleArray(randomTranslateWords);
      setWordLearn(randomLearnWord)
      setTranslateWordsArr(randomTranslateWords)
      if(startGame) playAudioWord(randomLearnWord.audio)
      setNextWord(false);
    }
  }, [words, wordLearn, nextWord, startGame, countLives, playAudioWord])

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnBlockPlayWord(start);
    playAudioWord(wordLearn.audio)
  }

  const checkCorrectAnswer = useCallback((word?: IWord) => {
    if (word?.id !== wordLearn.id || !word) {
      setCountLives(countLives - 1);
    }
    setViewAnswer(true);
  }, [wordLearn.id, countLives])

  const moveNextWord = useCallback(() => {
    setNextWord(true)
    setViewAnswer(!viewAnswer);
  },[viewAnswer])

  const handlerSoundChange = useCallback(() => {
    if(startGame) setOnSound(!onSound);
  },[onSound, startGame])


  const btnW = useRef(null);
  const onKeypress = useCallback(({code}: {code: string}) => {
    if(!startGame || onBlockPlayWord) return;
    switch (code) {
      case 'KeyM':handlerSoundChange();
        break;
      case 'Digit1': checkCorrectAnswer(translateWordsArr[0]);
        break;
      case 'Digit2': checkCorrectAnswer(translateWordsArr[1]);
        break;
      case 'Digit3': checkCorrectAnswer(translateWordsArr[2]);
        break;
      case 'Digit4': checkCorrectAnswer(translateWordsArr[3]);
        break;
      case 'Digit5': checkCorrectAnswer(translateWordsArr[4]);
        break;
      case 'Enter': return viewAnswer ? moveNextWord() : checkCorrectAnswer();
        break;
      case 'KeyR': playAudioWord(wordLearn.audio);
        break;
      default: 
        break;
    }
  },[startGame,
    onBlockPlayWord,
    viewAnswer,
    handlerSoundChange,
    checkCorrectAnswer,
    translateWordsArr,
    moveNextWord,
    playAudioWord,
    wordLearn.audio]);

  useEffect(() => {
    shuffleArray(words as IWord[]);
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress, words, countLives])

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {3} countDownHandler={countDownHandler}/>}
    <div className={cn(className, cl.audiocall)}>
      <div className={cl.games_panel}>
        <div className={cn(cl.games__setting, cl.games__setting_left)}>
          <ButtonSound handlerSoundChange={handlerSoundChange} onSound={onSound}/>
          <ButtonFullscreen/>
        </div>
        <div className={cn(cl.games__setting, cl.games__setting_right)}>
          <Lives countLives={countLives}/>
          <ButtonClose/>
        </div>
      </div>
      <div className={cn(cl.container)}>
        <div 
          className={onBlockPlayWord ? cn(cl.learn_word, cl.enable_play) : cn(cl.learn_word)} 
          onClick={() => !onBlockPlayWord && playAudioWord(wordLearn.audio)}
        >
          {viewAnswer ? 
            <>
              <img 
                src={`${BASE_URL}${wordLearn.image}`}
                alt={wordLearn.word}
                className={cn(cl.learn_image)}
              />
              <p className={cn(cl.learn__view_word)}>
                {wordLearn.word}
              </p>
            </>
            :
            <Lottie
              className={cn(className, cl.word_player)}
              animationData={soundOn}
              loop={onBlockPlayWord}
              autoplay={onBlockPlayWord}
              title={'Воспроизвести слово'}
            />
          }
        </div>
        <ul className={cn(className, cl.translation_words)}>
          {translateWordsArr.map((word, index) => (
            <li ref={btnW}
              className="audiocall__transition__word"
              key={`btn_word-${index}`}
              onClick={() => checkCorrectAnswer(word)}
            >
              <Button 
                className={viewAnswer && word.id === wordLearn.id ? 
                  cn(cl.button__translation_word, cl.word_correct) : 
                  cn(cl.button__translation_word, cl.word_error)}
                disabled={viewAnswer}
              >
                {`${index + 1}. ${word.wordTranslate}`}
              </Button>
            </li>
          ))}
        </ul>
        <div className="audiocall__button">
          <Button
            className={cn(cl.button__next)}
            onClick={() => {return viewAnswer ? moveNextWord() : checkCorrectAnswer()}}
            title={'Используй enter'}
          >
            {viewAnswer ? 'Следующее слово' : 'Не знаю'}
          </Button>
        </div>
      </div>
    </div>
  </>
};
