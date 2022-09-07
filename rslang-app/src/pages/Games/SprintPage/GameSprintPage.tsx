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
import { playAudioWord } from '../../../utils/audioPlayer';
import { updateUserWord } from '../../../utils/createUserWord';
import { GamePanel } from '../../../components/GamePanel/GamePanel';
import runMan from './../../../assets/json-animation/run_man.json';

const GAME_TIME_SECOND = 60;
const STEP_SCORE_GAME = 20;
const MIN_QUANTITY_WORDS = 2;
const MIN_LEARNED_WORDS = 10;
const TRANSLATE_WORDS_QUANTITY = 1;
const MIN_STEP_MULTIPLY = 1;
const MAX_STEP_MULTIPLY = 4;

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
    scoreGame, 
    setScoreGame
  } = props;
  const [translateWord, setTranslateWord] = useState({} as IWord);
  const [copyWordsArr, setCopyWordsArr] = useState<IWord[]>([]);
  const [wordLearn, setWordLearn] = useState({} as IWord);
  const [startGame, setStartGame] = useState<boolean>(false);
  const [nextWord, setNextWord] = useState<boolean>(false);
  const [onMute, setOnMute] = useState<boolean>(false);
  const [multiplyScore, setmultiplyScore] = useState<number>(MIN_STEP_MULTIPLY);
  const audiocallPage = useRef<HTMLDivElement>(null);
  const animRun = useRef<HTMLDivElement>(null);

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
      const randomTranslateWords =
        copyWordsArr.length < MIN_QUANTITY_WORDS ? getRandomWords(resultWordsArr!, TRANSLATE_WORDS_QUANTITY) : getRandomWords(copyWordsArr, TRANSLATE_WORDS_QUANTITY);
      randomTranslateWords.push(randomLearnWord);
      const randomAnswerTranslate = getRandomWord(randomTranslateWords);
      setWordLearn!(randomLearnWord);
      setTranslateWord(randomAnswerTranslate);
      setNextWord(false);
    } else if (resultWordsArr!.length === quantityWords) {
      setEndGame!(true);
    }
  }, [
    wordLearn,
    nextWord,
    translateWord,
    setEndGame,
    resultWordsArr,
    quantityWords,
    copyWordsArr,
    isUserLogged,
    getUserWord,
    setWordLearn,
  ]);

  const countDownHandler = useCallback((start: boolean, gameTime: number): void => {
    if(start && gameTime === GAME_TIME_SECOND){
      setEndGame!(start)
    } else {
      setStartGame(start);
    }
  },[setEndGame]);
  
  const moveNextWord = useCallback(() => {
    playSoundEffects(onMute);
    setNextWord(true);
    if (isUserLogged) updateUserWord(userWord as IUserWord);
  }, [isUserLogged, onMute, userWord]);

  const checkCorrectAnswer = useCallback((answer: boolean) => {
    if (!wordLearn) return;
    wordLearn.correctAnswer = (translateWord.word === wordLearn.word) === answer;
    if (isUserLogged && changeUserWord) changeUserWord(!wordLearn.correctAnswer);
    setResultWordsArr!(resultWordsArr!.concat([wordLearn]));
    playSoundEffects(onMute, wordLearn.correctAnswer);
    if(wordLearn.correctAnswer) {
      if (multiplyScore === MIN_STEP_MULTIPLY) {
        const scoreRes = scoreGame! + STEP_SCORE_GAME;
        if(animRun.current) animRun.current.style.transform = `translateX(${20}%)`;
        setScoreGame!(scoreRes)
      } else {
        const scoreRes = scoreGame! + STEP_SCORE_GAME * multiplyScore;
        if(animRun.current && audiocallPage.current) {
          animRun.current.style.transform = `translateX(${20 * (multiplyScore)}%)`;
        }
        setScoreGame!(scoreRes)
      }
      const multiplyRes = multiplyScore < MAX_STEP_MULTIPLY ? multiplyScore + 1 : multiplyScore;
      setmultiplyScore(multiplyRes)
    } else {
      setmultiplyScore(MIN_STEP_MULTIPLY)
      if(animRun.current) animRun.current.style.transform = `translateX(${0}%)`
    }
    moveNextWord();
  }, [
    changeUserWord,
    isUserLogged,
    moveNextWord,
    multiplyScore,
    onMute,
    resultWordsArr,
    scoreGame,
    setResultWordsArr,
    setScoreGame,
    translateWord.word,
    wordLearn])

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
        case 'ArrowLeft':
          checkCorrectAnswer(false);
          break;
        case 'ArrowRight':
          checkCorrectAnswer(true);
          break;
        case 'KeyR':
          alert('Молодец, Ты нашел дополнительный функционал - пасхалку!')
          playAudioWord(wordLearn!.audio);
          break;
      }
    },
    [startGame, handlerSoundChange, checkCorrectAnswer, wordLearn],
  );

  useEffect(() => {
    document.addEventListener('keyup', onKeypress);
    return () => {
      document.removeEventListener('keyup', onKeypress);
    };
  }, [onKeypress]);

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
                {`${scoreGame}`}
              </div>
              <div className={cn(cl.sprint_multiplier, cl.ac)}>
                {startGame && 
                <div ref = {animRun} className={cn(cl.animation_wrapper)}>
                  <Lottie
                    className={cn(className, cl.sprint_animation)}
                    animationData={runMan}
                  />
                </div>}
              </div>
              <div className={cn(cl.sprint_timer)}>
                {<CountDown className={cl.sprint_countdown} seconds={GAME_TIME_SECOND} onPauseTimer={startGame} countDownHandler={countDownHandler}/>}
              </div>
            </div>
            <ul className={cn(className, cl.translation_words)}>
              <li className={cn(cl.translation_word)}>
                {wordLearn.word ? `${wordLearn.word}` : ''}
              </li>
              <li className={cn(cl.translation_word)}>
                {translateWord.word ? `${translateWord.wordTranslate}` : ''}
              </li>
            </ul>
            <div className={cn(cl.sprint__buttons)}>
              <Button
                className={cn(cl.button__incorrect, cl.sprint_btn)}
                onClick={() => checkCorrectAnswer(false)}
                title={'Нажми стрелку влево'}
              >
                {'Неверно'}
              </Button>
              <Button
                className={cn(cl.button__correct, cl.sprint_btn)}
                onClick={() => checkCorrectAnswer(true)}
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
