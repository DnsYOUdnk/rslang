import cl from './GameWrapperPage.module.css';
import cn from 'classnames';
import React, { cloneElement, useEffect, useCallback, useState } from 'react';
import { GameWrapperPageProps } from './GameWrapperPage.props';
import { GameModalWindow } from '../../components/GameModalWindow/GameModalWindow';
import { LevelGroupWords } from '../../components/LevelGroupWords/LevelGroupWords';
import { useGetWords } from '../../customHooks/useGetWords';
import { GameLoader } from '../../components/GameLoader/GameLoader';
import { IUserWord, IWord } from '../../types/dataWordTypes';
import { GameStatistic } from '../../components/GameStatistic/GameStatistic';
import { createUserWord } from '../../utils/createUserWord';
import { useGetStatistic } from '../../customHooks/useGetStatistic';
import { useLocation } from 'react-router-dom';

const RESET = 0;
const ONCE_PER_GAME = 1;

export const GameWrapperPage = ({ dataGame, children, className }: GameWrapperPageProps): JSX.Element => {
  const { onLoading, listWords, isUserLogged, getWords } = useGetWords();
  const { statistic, setStatistic, isStatic, getStatistic, updateStatistic } = useGetStatistic();
  const [resultWordsArr, setResultWordsArr] = useState<IWord[]>([]);
  const [userWord, setUserWord] = useState({} as IUserWord);
  const [onStart, setOnStart] = useState(false);
  const [endGame, setEndGame] = useState(false);
  const location = useLocation();
  const [learnedWords, setLearnedWords] = useState(0);
  const [newWords, setNewWords] = useState(0);
  const [bestSeries, setBestSeries] = useState(0);
  const [bestCorrectSeries, setBestCorrectSeries] = useState(0);

  const updateGameStat = useCallback(() => {
    const hashArr = location.pathname.split('/');
    const gameName = hashArr[hashArr.length - 1];
    const today = new Date().toLocaleDateString();
    const quantityCorrectWords = resultWordsArr.filter(({ correctAnswer }) => correctAnswer).length;
    const precent = Math.floor((quantityCorrectWords / resultWordsArr.length ) * 100);
    let defaultOptional = {
      learnedWords: 0,
      newWords: 0,
      procCorrectWord: 0,
      bestSeries: 0
    };
    if(statistic.optional[gameName][today]) {
      defaultOptional = statistic.optional[gameName][today];
      defaultOptional.bestSeries = defaultOptional.bestSeries < bestSeries ? bestSeries : defaultOptional.bestSeries;
      defaultOptional.newWords += newWords;
      defaultOptional.learnedWords += learnedWords;
      defaultOptional.procCorrectWord = defaultOptional.procCorrectWord !== 0 ? Math.floor((defaultOptional.procCorrectWord + precent)/2) : precent;
      statistic.optional[gameName][today] = defaultOptional;
      // console.log(statistic)
    } else {
      defaultOptional.bestSeries = bestSeries;
      defaultOptional.newWords = newWords;
      defaultOptional.learnedWords = learnedWords;
      defaultOptional.procCorrectWord = precent;
      statistic.optional[gameName][today] = defaultOptional;
      // console.log(statistic)
    }
    setStatistic(statistic)
    updateStatistic(statistic)
  },[bestSeries, learnedWords, location.pathname, newWords, resultWordsArr, setStatistic, statistic, updateStatistic])

  useEffect(() => {
    if(!isStatic) {
      console.log('getStatistic')
      getStatistic();
    }
  },[getStatistic, isStatic, location.key])

  useEffect(() => {
    if(endGame && resultWordsArr.length && isUserLogged && isStatic) {
      console.log('updateStatistic')
      console.log('isStatic--', isStatic)
      console.log('resultWordsArr--', resultWordsArr.length)
      console.log('isUserLogged--', isUserLogged)
      console.log('endGame--', endGame)
      updateGameStat()
    }
  },[endGame, getStatistic, isStatic, isUserLogged, location, onStart, resultWordsArr.length, statistic, updateGameStat, updateStatistic])

  const getNewUserWord = useCallback(
    async (learnWord: IWord) => {
      if (!learnWord.userWord) {
        setNewWords(newWords+1)
        const res = await createUserWord(learnWord);
        const data = await res.json();
        setUserWord!(data);
      } else {
        setUserWord!({ wordId: learnWord._id, ...learnWord.userWord });
      }
    },[newWords]
  );

  const changeUserWord = useCallback(
    (incorrect: boolean) => {
      const newUserWord = JSON.parse(JSON.stringify(userWord));
      if (userWord && incorrect) {
        const bestRow = bestCorrectSeries < bestSeries ? bestSeries : bestCorrectSeries;
        setBestSeries(bestRow);
        setBestCorrectSeries(0)
        newUserWord.optional.countCorrectSeries = RESET;
        newUserWord.optional.isWordLearned = false;
      } else {
        setBestCorrectSeries(bestCorrectSeries+1)
        newUserWord.optional.countCorrectSeries += ONCE_PER_GAME;
        newUserWord.optional.countLearn += ONCE_PER_GAME;
        const numberCorrectAnswer = newUserWord.difficulty === 'easy' ? 3 : newUserWord.difficulty === 'hard' ? 5 : 4;
        newUserWord.optional.isWordLearned = newUserWord.optional.countCorrectSeries >= numberCorrectAnswer;
        if(newUserWord.optional.isWordLearned) setLearnedWords(learnedWords + 1)
      }
      newUserWord.optional.numberUses += ONCE_PER_GAME;
      setUserWord!(newUserWord);
    },
    [bestCorrectSeries, bestSeries, learnedWords, userWord],
  );

  const levelHandler = (group: number): void => {
    getWords(group);
    setOnStart(true);
  };

  const repeatGame = () => {
    setEndGame(false);
    setResultWordsArr([]);
    setOnStart(true);
  };

  const gameContent = (() => {
    if (children && !onLoading && onStart && listWords.length) {
      const gameProps = {
        words: listWords,
        quantityWords: listWords.length,
        isUserLogged: isUserLogged,
        setEndGame: setEndGame,
        resultWordsArr: resultWordsArr,
        setResultWordsArr: setResultWordsArr,
        userWord: userWord,
        getUserWord: getNewUserWord,
        changeUserWord: changeUserWord,
      };
      return cloneElement(children as React.ReactElement, gameProps);
    }
    return null;
  })();

  return (
    <>
      <main className={cn(className, cl.main)}>
        {(() => {
          if (!endGame) {
            if (onStart && listWords.length) {
              return <>{gameContent}</>;
            } else {
              return !onLoading ? (
                <GameModalWindow dataGame={dataGame}>
                  <LevelGroupWords levelHandler={levelHandler} />
                </GameModalWindow>
              ) : (
                <GameLoader />
              );
            }
          } else {
            return <GameStatistic resultWordsArr={resultWordsArr} repeatGame={repeatGame} />;
          }
        })()}
      </main>
    </>
  );
};
