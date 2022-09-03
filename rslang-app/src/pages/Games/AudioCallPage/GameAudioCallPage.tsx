import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import Lottie from 'lottie-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GameAudioCallProps } from './GameAudioCallPage.props';
import { CountDown } from '../../../components/CountDown/CountDown';
import { ButtonSound } from '../../../components/ButtonSound/ButtonSound';
import { ButtonFullscreen } from '../../../components/ButtonFullScreen/ButtonFullscreen';
import { Lives } from '../../../components/Lives/Lives';
import { ButtonClose } from '../../../components/ButtonClose/ButtonClose';
import { Button } from '../../../components/Button/Button';
import { shuffleArray } from '../../../utils/shuffleArray';
import { IWord } from '../../../types/dataWordTypes';
import { getRandomWord, getRandomWords } from '../../../utils/getRandomWords';
import voiceWordOn from './../../../assets/json-animation/voiceWordOn.json';
import { playSoundEffects } from '../../../utils/playSoundEffects';
import { audioPlayer, playAudioWord } from '../../../utils/audioPlayer';

const BASE_URL = 'https://react-learn-language.herokuapp.com/';
const DEFAULT_MAX_LIVES = 5;
const ZERO_LIVES = 0;
const MIN_QUANTITY_WORDS = 5;

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const {words, quantityWords, setEndGame , resultWordsArr, setResultWordsArr} = props;
  const [wordLearn, setWordLearn] = useState({} as IWord);
  const [translateWordsArr, setTranslateWordsArr] = useState<IWord[]>([]);
  const [copyWordsArr, setCopyWordsArr] = useState<IWord[]>([]);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [onMute, setOnMute] = useState<boolean>(false);
  const [onBlockPlayWord, setOnBlockPlayWord] = useState<boolean>(false);
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);
  const [nextWord, setNextWord] = useState<boolean>(false);
  const [countLives, setCountLives] = useState<number>(DEFAULT_MAX_LIVES);
  const audiocallPage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shuffleArray(words as IWord[]);
    setCopyWordsArr(JSON.parse(JSON.stringify(words)));
  }, [words])

  audioPlayer.addEventListener('play',() => {
    setOnBlockPlayWord(true)
  })

  audioPlayer.addEventListener('ended',() => {
    setOnBlockPlayWord(false)
  })
  
  useEffect(() => {
    if((!wordLearn.id || nextWord) && copyWordsArr && copyWordsArr.length && countLives > ZERO_LIVES) {
      const randomLearnWord = getRandomWord(copyWordsArr);
      const randomTranslateWords = copyWordsArr.length < MIN_QUANTITY_WORDS ? getRandomWords(resultWordsArr!): getRandomWords(copyWordsArr);
      randomTranslateWords.push(randomLearnWord)
      shuffleArray(randomTranslateWords);
      setWordLearn(randomLearnWord)
      setTranslateWordsArr(randomTranslateWords)
      if(startGame) playAudioWord(randomLearnWord.audio)
      setNextWord(false);
    } else if (resultWordsArr!.length === quantityWords || !countLives) {
      setEndGame!(true)
    }
  }, [wordLearn, nextWord, startGame, countLives, translateWordsArr, setEndGame, resultWordsArr, quantityWords, onBlockPlayWord, copyWordsArr])

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnBlockPlayWord(start);
    playAudioWord(wordLearn.audio)
  }

  const checkCorrectAnswer = useCallback((word?: IWord) => {
    wordLearn.correctAnswer = word ? word.id === wordLearn.id : false;
    setResultWordsArr!(resultWordsArr!.concat([wordLearn]));

    if (!wordLearn.correctAnswer) {
      setCountLives(countLives - 1);
    }

    playSoundEffects(onMute, wordLearn.correctAnswer)
    setViewAnswer(true);
  }, [wordLearn, setResultWordsArr, resultWordsArr, onMute, countLives])

  const moveNextWord = useCallback(() => {
    playSoundEffects(onMute)
    setNextWord(true)
    setViewAnswer(!viewAnswer);
  },[viewAnswer, onMute])

  const handlerSoundChange = useCallback(() => {
    playSoundEffects(onMute)
    if(startGame) setOnMute(!onMute);
  },[onMute, startGame])

  const onKeypress = useCallback(({code}: {code: string}) => {
    if(!startGame || onBlockPlayWord) return;
    switch (code) {
      case 'KeyM':handlerSoundChange();
        break;
      case 'Digit1': return checkCorrectAnswer(translateWordsArr[0]);
      case 'Digit2': return checkCorrectAnswer(translateWordsArr[1]);
      case 'Digit3': return checkCorrectAnswer(translateWordsArr[2]);
      case 'Digit4': return checkCorrectAnswer(translateWordsArr[3]);
      case 'Digit5': return checkCorrectAnswer(translateWordsArr[4]);
      case 'Enter': return viewAnswer ? moveNextWord() : checkCorrectAnswer();
      case 'KeyR': return playAudioWord(wordLearn.audio);
      default: 
        break;
    }
  },[startGame, onBlockPlayWord, viewAnswer, handlerSoundChange, checkCorrectAnswer, translateWordsArr, moveNextWord, wordLearn.audio]);

  useEffect(() => {
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress, countLives])

  return <>
    {!startGame && <CountDown className={cl.countDown} seconds = {3} countDownHandler={countDownHandler}/>}
    <div ref={audiocallPage} className={cn(className, cl.audiocall)}>
      <div className={cl.games_panel}>
        <div className={cn(cl.games__setting, cl.games__setting_left)}>
          <ButtonSound handlerSoundChange={handlerSoundChange} onSound={onMute}/>
          <ButtonFullscreen audiocallPage={audiocallPage.current}/>
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
              animationData={voiceWordOn}
              loop={onBlockPlayWord}
              autoplay={onBlockPlayWord}
              title={'Воспроизвести слово (Нажми R)'}
            />
          }
        </div>
        <ul className={cn(className, cl.translation_words)}>
          {translateWordsArr.map((word, index) => (
            <li
              className="audiocall__transition__word"
              key={`btn_word-${index}`}
              onClick={() => checkCorrectAnswer(word)}
              title={`Если верно кликни или нажми (${index+1})`}
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
            title={'Нажми Enter'}
          >
            {viewAnswer ? 'Следующее слово' : 'Не знаю'}
          </Button>
        </div>
      </div>
    </div>
  </>
};
