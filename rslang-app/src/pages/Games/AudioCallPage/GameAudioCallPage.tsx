import cl from './GameAudioCallPage.module.css';
import cn from 'classnames';
import { useCallback, useEffect, useMemo, useState } from 'react';
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
  const [wordLearn, setWordLearn] = useState({} as IWord);
  const [translateWordsArr, setTranslateWordsArr] = useState<IWord[]>([]);
  const [startGame, setStartGame] = useState(false);
  const [onSound, setOnSound] = useState(false);
  const [onBlockPlayWord, setOnBlockPlayWord] = useState(false);
  const [viewAnswer, setViewAnswer] = useState(false);
  const [nextWord, setNextWord] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState(false);

  const audioPlayer = useMemo(() => new Audio(), []);

  useEffect(() => {
    shuffleArray(words as IWord[]);
  }, [ words ])

  const playAudioWord = useCallback((url: string): void => {
    setOnBlockPlayWord(!onBlockPlayWord)
    audioPlayer.src = BASE_URL + url;
    audioPlayer.play();
  }, [audioPlayer, onBlockPlayWord])

  audioPlayer.addEventListener('ended',() => {
    setOnBlockPlayWord(false)
  })

  useEffect(() => {
    if((!wordLearn.id || nextWord) && words && words.length) {
      const randomLearnWord = getRandomWord(words);
      const randomTranslateWords = getRandomWords(words);
      randomTranslateWords.push(randomLearnWord)
      shuffleArray(randomTranslateWords);
      setWordLearn(randomLearnWord)
      setTranslateWordsArr(randomTranslateWords)
      if(startGame) playAudioWord(randomLearnWord.audio)
      setNextWord(false);
    } 
    // else if (words &&!words.length) {
    //   alert('the end')
    // }
  }, [words, wordLearn, nextWord, startGame, playAudioWord])

  const countDownHandler = (start: boolean): void => {
    setStartGame(start);
    setOnBlockPlayWord(start);
    playAudioWord(wordLearn.audio)
  }

  const handlerSoundChange = () => {
    setOnSound(!onSound);
  }

  const checkCorrectAnswer = (word: IWord) => {
    console.log('click word')
    setViewAnswer(true);
    setCorrectAnswer(word.id === wordLearn.id);
  }

  const showCorrectAnswer = () => {
    if(viewAnswer) {
      setNextWord(true)
    }
    setViewAnswer(!viewAnswer);
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
            <li 
              className="audiocall__transition__word"
              key={`btn_word-${index}`}
              onClick={() => checkCorrectAnswer(word)}>
              <Button 
                className={cn(cl.button__translation_word)}
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
            onClick={() => viewAnswer ? showCorrectAnswer() : showCorrectAnswer()}
          >
            {viewAnswer ? 'Следующее слово' : 'Не знаю'}
          </Button>
        </div>
      </div>
    </div>
  </>
};
