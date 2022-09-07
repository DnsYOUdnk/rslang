import cl from './GameSprintPage.module.css';
import cn from 'classnames';
import Lottie from 'lottie-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { GameSprintPageProps } from './GameSprintPage.props';
import { CountDown } from '../../../components/CountDown/CountDown';
import { Button } from '../../../components/Button/Button';
import { shuffleArray } from '../../../utils/shuffleArray';
import { IUserWord, IWord } from '../../../types/dataWordTypes';
import { getRandomWord, getRandomWords } from '../../../utils/getRandomWords';
import { playSoundEffects } from '../../../utils/playSoundEffects';
import { audioPlayer, playAudioWord } from '../../../utils/audioPlayer';
import { updateUserWord } from '../../../utils/createUserWord';
import { GamePanel } from '../../../components/GamePanel/GamePanel';
import runMan from './../../../assets/json-animation/run_man.json';

const GAME_TIME_SECOND = 60;
const DEFAULT_MAX_LIVES = 5;
const FIRST_ELEM = 0;
const MIN_QUANTITY_WORDS = 2;
const MIN_LEARNED_WORDS = 10;
const TRANSLATE_WORDS_QUANTITY = 1;

export const GameSprintPage = ({ className, ...props }: GameSprintPageProps) => {
  const {
    words,
    quantityWords,
    isUserLogged,
    setEndGame,
    resultWordsArr,
    setResultWordsArr,
    userWord,
    getUserWord,
    changeUserWord,
  } = props;
  const [translateWordsArr, setTranslateWordsArr] = useState({} as IWord);
  const [copyWordsArr, setCopyWordsArr] = useState<IWord[]>([]);
  const [wordLearn, setWordLearn] = useState({} as IWord);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [onMute, setOnMute] = useState<boolean>(false);
  const [viewAnswer, setViewAnswer] = useState<boolean>(false);
  const [nextWord, setNextWord] = useState<boolean>(false);
  const [countLives, setCountLives] = useState<number>(DEFAULT_MAX_LIVES);
  const audiocallPage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shuffleArray(words as IWord[]);
    setCopyWordsArr(JSON.parse(JSON.stringify(words)));
  }, [words]);

  useEffect(() => {
    if ((!wordLearn!.word || nextWord) && copyWordsArr && copyWordsArr.length) {
      const randomLearnWord = getRandomWord(copyWordsArr);
      if (isUserLogged && getUserWord) {
        getUserWord(randomLearnWord);
      }
      const randomTranslateWord =
        copyWordsArr.length < MIN_QUANTITY_WORDS ? getRandomWords(resultWordsArr!, TRANSLATE_WORDS_QUANTITY) : getRandomWords(copyWordsArr, TRANSLATE_WORDS_QUANTITY);
      setWordLearn!(randomLearnWord);
      setTranslateWordsArr(randomTranslateWord[FIRST_ELEM]);
      setNextWord(false);
    } else if (resultWordsArr!.length === quantityWords || !countLives) { //ВМЕСТО КОУНТА БУДЕТ ВРЕМЯ ВЫШЛО
      setEndGame!(true);
    }
  }, [
    wordLearn,
    nextWord,
    countLives,
    translateWordsArr,
    setEndGame,
    resultWordsArr,
    quantityWords,
    copyWordsArr,
    isUserLogged,
    getUserWord,
    setWordLearn,
  ]);

  const countDownHandler = (start: boolean, gameTime: number): void => {
    if(start && gameTime === GAME_TIME_SECOND){
      setEndGame!(start)
    } else {
      setStartGame(start);
    }
  };

  const checkCorrectAnswer = useCallback(
    (wordSelected?: IWord) => {
      if (viewAnswer || !wordLearn) return;
      wordLearn.correctAnswer = wordSelected ? wordSelected.word === wordLearn.word : false;
      if (isUserLogged && changeUserWord) changeUserWord(!wordLearn.correctAnswer);
      setResultWordsArr!(resultWordsArr!.concat([wordLearn]));
      if (!wordLearn.correctAnswer) {
        setCountLives(countLives - 1);
      }
      playSoundEffects(onMute, wordLearn.correctAnswer);
      setViewAnswer(true);
    },
    [viewAnswer, wordLearn, isUserLogged, changeUserWord, setResultWordsArr, resultWordsArr, onMute, countLives],
  );

  const moveNextWord = useCallback(() => {
    playSoundEffects(onMute);
    setNextWord(true);
    if (isUserLogged) updateUserWord(userWord as IUserWord);
    setViewAnswer(!viewAnswer);
  }, [isUserLogged, onMute, userWord, viewAnswer]);

  const handlerSoundChange = useCallback(() => {
    playSoundEffects(onMute);
    if (startGame) setOnMute(!onMute);
  }, [onMute, startGame]);

  const onKeypress = useCallback(
    ({ code }: { code: string }) => {
      if (!startGame) return;
      switch (code) {
        case 'KeyM':
          handlerSoundChange();
          break;
        case 'Digit6':
          return console.log(translateWordsArr);
        case 'Enter':
          return viewAnswer ? moveNextWord() : checkCorrectAnswer();
        case 'KeyR':
          return playAudioWord(wordLearn!.audio);
        default:
          break;
      }
    },
    [
      startGame,
      handlerSoundChange,
      checkCorrectAnswer,
      translateWordsArr,
      viewAnswer,
      moveNextWord,
      wordLearn,
    ],
  );

  useEffect(() => {
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress, countLives]);

  return (
    <>
      {!startGame && <CountDown className={cl.countDown} seconds={3} onPauseTimer={!startGame} countDownHandler={countDownHandler} />}
      <div ref={audiocallPage} className={cn(className, cl.sprint)}>
        <GamePanel
          buttonSound={{isEnable: true, handlerFunc: handlerSoundChange, isOnSound: onMute }}
          buttonFullScr={{isEnable: true, fullScreenElement: audiocallPage.current }}
          buttonEnd={{isEnable: false, arrResultWords: resultWordsArr, minLearnedWords: MIN_LEARNED_WORDS, onEndGame: setEndGame }}
          lives={{ isEnable: false }}
          buttonClose={{ isEnable: true }}
        />
        <div className={cn(cl.container)}>
          <div className={cn(cl.sprint_panel__wrapper)}>
            <div className={cn(cl.sprint_panel)}>
              <div className={cn(cl.sprint_score)}>
                {`${0}`}
              </div>
              <div className={cn(cl.sprint_multiplier, cl.ac)}>
                {startGame && <Lottie
                  className={cn(className, cl.sprint_animation)}
                  animationData={runMan}
                />}
              </div>
              <div className={cn(cl.sprint_timer)}>
                {<CountDown className={cl.sprint_countdown} seconds={GAME_TIME_SECOND} onPauseTimer={startGame} countDownHandler={countDownHandler}/>}
              </div>
            </div>
            <ul className={cn(className, cl.translation_words)}>
              {/* {translateWordsArr.map((wordElem, index) => (
                <li
                  className={cn(cl.translation_word)}
                  key={`btn_word-${index}`}
                >
                  {`${!index ? wordElem.word : wordElem.wordTranslate}`}
                </li>
              ))} */}
            </ul>
            <div className={cn(cl.sprint__buttons)}>
              <Button
                className={cn(cl.button__incorrect, cl.sprint_btn)}
                onClick={() => {
                  return viewAnswer ? moveNextWord() : checkCorrectAnswer();
                }}
                title={'Нажми стрелку влево'}
              >
                {'Неверно'}
              </Button>
              <Button
                className={cn(cl.button__correct, cl.sprint_btn)}
                onClick={() => {
                  return viewAnswer ? moveNextWord() : checkCorrectAnswer();
                }}
                title={'Нажми стрелку вправо'}
              >
                {'Верно'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
