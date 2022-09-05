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
import { IUserWord, IWord } from '../../../types/dataWordTypes';
import { getRandomWord, getRandomWords } from '../../../utils/getRandomWords';
import voiceWordOn from './../../../assets/json-animation/voiceWordOn.json';
import { playSoundEffects } from '../../../utils/playSoundEffects';
import { audioPlayer, playAudioWord } from '../../../utils/audioPlayer';
import { createUserWord, updateUserWord } from '../../../utils/createUserWord';

const BASE_URL = 'https://react-learn-language.herokuapp.com/';
const DEFAULT_MAX_LIVES = 5;
const ZERO_LIVES = 0;
const RESET = 0;
const MIN_QUANTITY_WORDS = 5;
const MIN_LEARNED_WORDS = 10;
const ONCE_PER_GAME = 1;

export const GameAudioCallPage = ({ className, ...props }: GameAudioCallProps) => {
  const { 
    words, 
    quantityWords, 
    isUserLogged, 
    setEndGame, 
    resultWordsArr, 
    setResultWordsArr,
    userWord,
    setUserWord
  } = props;
  const [translateWordsArr, setTranslateWordsArr] = useState<IWord[]>([]);
  const [copyWordsArr, setCopyWordsArr] = useState<IWord[]>([]);
  const [wordLearn, setWordLearn] = useState({} as IWord);
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
  }, [words]);

  audioPlayer.addEventListener('play', () => {
    setOnBlockPlayWord(true);
  });

  audioPlayer.addEventListener('ended', () => {
    setOnBlockPlayWord(false);
  });

  const getUserWord = useCallback(async (learnWord: IWord) => {
    if (!learnWord.userWord) {
      const res = await createUserWord(learnWord);
      const data = await res.json();
      setUserWord!(data)
    } else {
      setUserWord!({wordId: learnWord._id, ...learnWord.userWord})
    }
  },[setUserWord]);

  useEffect(() => {
    if ((!wordLearn!.word || nextWord) && copyWordsArr && copyWordsArr.length && countLives > ZERO_LIVES) {
      const randomLearnWord = getRandomWord(copyWordsArr);
      if (isUserLogged) {
        getUserWord(randomLearnWord)
      }
      const randomTranslateWords =
        copyWordsArr.length < MIN_QUANTITY_WORDS ? getRandomWords(resultWordsArr!) : getRandomWords(copyWordsArr);
      randomTranslateWords.push(randomLearnWord);
      shuffleArray(randomTranslateWords);
      setWordLearn!(randomLearnWord);
      setTranslateWordsArr(randomTranslateWords);
      if (startGame) playAudioWord(randomLearnWord.audio);
      setNextWord(false);
    } else if (resultWordsArr!.length === quantityWords || !countLives) {
      setEndGame!(true);
    }
  }, [wordLearn, nextWord, startGame, countLives, translateWordsArr, setEndGame, resultWordsArr, quantityWords, onBlockPlayWord, copyWordsArr, isUserLogged, getUserWord, setWordLearn]);

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnBlockPlayWord(start);
    playAudioWord(wordLearn!.audio);
  };

  const changeUserWord = useCallback((correct: boolean) => {
    const newUserWord = JSON.parse(JSON.stringify(userWord));
    if (userWord && correct) {
      newUserWord.optional.countCorrectSeries = RESET;
      newUserWord.optional.isWordLearned = false;
    } else {
      newUserWord.optional.countCorrectSeries += ONCE_PER_GAME;
      newUserWord.optional.countLearn += ONCE_PER_GAME;
      const numberCorrectAnswer = newUserWord.difficulty === 'easy' ? 
        3 : newUserWord.difficulty === 'hard' ? 5 : 4;
      newUserWord.optional.isWordLearned = newUserWord.optional.countCorrectSeries >= numberCorrectAnswer;
    }
    newUserWord.optional.numberUses += ONCE_PER_GAME;
    setUserWord!(newUserWord);
  },[setUserWord, userWord])

  const checkCorrectAnswer = useCallback(
    (wordSelected?: IWord) => {
      if (viewAnswer || !wordLearn) return;
      wordLearn.correctAnswer = wordSelected ? wordSelected.word === wordLearn.word : false;
      if (isUserLogged) changeUserWord(!wordLearn.correctAnswer)
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
      if (!startGame || onBlockPlayWord) return;
      switch (code) {
        case 'KeyM':
          handlerSoundChange();
          break;
        case 'Digit1':
          return checkCorrectAnswer(translateWordsArr[0]);
        case 'Digit2':
          return checkCorrectAnswer(translateWordsArr[1]);
        case 'Digit3':
          return checkCorrectAnswer(translateWordsArr[2]);
        case 'Digit4':
          return checkCorrectAnswer(translateWordsArr[3]);
        case 'Digit5':
          return checkCorrectAnswer(translateWordsArr[4]);
        case 'Enter':
          return viewAnswer ? moveNextWord() : checkCorrectAnswer();
        case 'KeyR':
          return playAudioWord(wordLearn!.audio);
        default:
          break;
      }
    },
    [startGame, onBlockPlayWord, handlerSoundChange, checkCorrectAnswer, translateWordsArr, viewAnswer, moveNextWord, wordLearn],
  );

  useEffect(() => {
    document.addEventListener('keypress', onKeypress);
    return () => {
      document.removeEventListener('keypress', onKeypress);
    };
  }, [onKeypress, countLives]);

  return (
    <>
      {!startGame && <CountDown className={cl.countDown} seconds={3} countDownHandler={countDownHandler} />}
      <div ref={audiocallPage} className={cn(className, cl.audiocall)}>
        <div className={cl.games_panel}>
          <div className={cn(cl.games__setting, cl.games__setting_left)}>
            <ButtonSound handlerSoundChange={handlerSoundChange} onSound={onMute} />
            <ButtonFullscreen audiocallPage={audiocallPage.current} />
          </div>
          {resultWordsArr && resultWordsArr.length > MIN_LEARNED_WORDS && (
            <div className={cn(cl.games__setting__btn_end)}>
              <Button onClick={() => setEndGame!(true)} title={'Завершить и получить результат игры'}>
                Завершить игру
              </Button>
            </div>
          )}
          <div className={cn(cl.games__setting, cl.games__setting_right)}>
            <Lives countLives={countLives} />
            <ButtonClose />
          </div>
        </div>
        <div className={cn(cl.container)}>
          <div
            className={onBlockPlayWord ? cn(cl.learn_word, cl.enable_play) : cn(cl.learn_word)}
            onClick={() => !onBlockPlayWord && playAudioWord(wordLearn!.audio)}
          >
            {viewAnswer && wordLearn ? (
              <>
                <img src={`${BASE_URL}${wordLearn.image}`} alt={wordLearn.word} className={cn(cl.learn_image)} />
                <p className={cn(cl.learn__view_word)}>{wordLearn.word}</p>
              </>
            ) : (
              <Lottie
                className={cn(className, cl.word_player)}
                animationData={voiceWordOn}
                loop={onBlockPlayWord}
                autoplay={onBlockPlayWord}
                title={'Воспроизвести слово (Нажми R)'}
              />
            )}
          </div>
          <ul className={cn(className, cl.translation_words)}>
            {translateWordsArr.map((wordElem, index) => (
              <li
                className='audiocall__transition__word'
                key={`btn_word-${index}`}
                onClick={() => checkCorrectAnswer(wordElem)}
                title={`Если верно кликни или нажми (${index + 1})`}
              >
                <Button
                  className={
                    viewAnswer && wordElem.word === wordLearn!.word
                      ? cn(cl.button__translation_word, cl.word_correct)
                      : cn(cl.button__translation_word, cl.word_error)
                  }
                  disabled={viewAnswer}
                >
                  {`${index + 1}. ${wordElem.wordTranslate}`}
                </Button>
              </li>
            ))}
          </ul>
          <div className='audiocall__button'>
            <Button
              className={cn(cl.button__next)}
              onClick={() => {
                return viewAnswer ? moveNextWord() : checkCorrectAnswer();
              }}
              title={'Нажми Enter'}
            >
              {viewAnswer ? 'Следующее слово' : 'Не знаю'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
