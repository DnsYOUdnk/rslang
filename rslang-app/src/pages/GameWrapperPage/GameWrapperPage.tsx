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
import { getUpdateObjStatistic } from '../../utils/getUpdateObjStatistic';

const RESET = 0;
const ONCE_PER_GAME = 1;

export const GameWrapperPage = ({ dataGame, children, className }: GameWrapperPageProps): JSX.Element => {
  const { onLoading, listWords, isUserLogged, getWords } = useGetWords();
  const { statistic, setStatistic, isGetStatic, getStatistic, updateStatistic } = useGetStatistic();
  const [resultWordsArr, setResultWordsArr] = useState<IWord[]>([]);
  const [userWord, setUserWord] = useState({} as IUserWord);
  const [onStart, setOnStart] = useState<boolean>(false);
  const [endGame, setEndGame] = useState<boolean>(false);
  const [isUpdateStatic, setIsUpdateStatic] = useState<boolean>(false);
  const location = useLocation();
  const [learnedWords, setLearnedWords] = useState<number>(0);
  const [newWords, setNewWords] = useState<number>(0);
  const [bestSeries, setBestSeries] = useState<number>(0);
  const [bestCorrectSeries, setBestCorrectSeries] = useState<number>(0);
  const [scoreGame, setScoreGame] = useState<number>(0);

  const updateGameStat = useCallback(() => {
    const updateStatisticValue = getUpdateObjStatistic(resultWordsArr, statistic, bestSeries, newWords, learnedWords);
    setStatistic(updateStatisticValue);
    setIsUpdateStatic(false);
    updateStatistic(updateStatisticValue);
  }, [bestSeries, learnedWords, newWords, resultWordsArr, statistic, setStatistic, updateStatistic]);

  useEffect(() => {
    if (!isGetStatic && onStart) {
      getStatistic();
      setIsUpdateStatic(true);
    }
  }, [getStatistic, isGetStatic, location.key, onLoading, onStart, statistic]);

  useEffect(() => {
    if (endGame && resultWordsArr.length && isUserLogged && isUpdateStatic) {
      updateGameStat();
    }
  }, [endGame, isUpdateStatic, isUserLogged, resultWordsArr.length, updateGameStat]);

  const getNewUserWord = useCallback(
    async (learnWord: IWord) => {
      if (!learnWord.userWord) {
        setNewWords(newWords + 1);
        const res = await createUserWord(learnWord);
        const data = await res.json();
        setUserWord!(data);
      } else {
        setUserWord!({ wordId: learnWord._id, ...learnWord.userWord });
      }
    },
    [newWords],
  );

  const changeUserWord = useCallback(
    (incorrect: boolean) => {
      const newUserWord = JSON.parse(JSON.stringify(userWord));
      if (userWord && incorrect) {
        const bestRow = bestCorrectSeries < bestSeries ? bestSeries : bestCorrectSeries;
        setBestSeries(bestRow);
        setBestCorrectSeries(0);
        newUserWord.optional.countCorrectSeries = RESET;
        newUserWord.optional.isWordLearned = false;
      } else {
        setBestCorrectSeries(bestCorrectSeries + 1);
        newUserWord.optional.countCorrectSeries += ONCE_PER_GAME;
        newUserWord.optional.countLearn += ONCE_PER_GAME;
        const numberCorrectAnswer = newUserWord.difficulty === 'easy' ? 3 : newUserWord.difficulty === 'hard' ? 5 : 4;
        newUserWord.optional.isWordLearned = newUserWord.optional.countCorrectSeries >= numberCorrectAnswer;
        if (newUserWord.optional.isWordLearned) setLearnedWords(learnedWords + 1);
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
    setScoreGame(0);
    setOnStart(true);
    setIsUpdateStatic(true);
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
        scoreGame: scoreGame,
        setScoreGame: setScoreGame,
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
            return <GameStatistic resultWordsArr={resultWordsArr} scoreGame={scoreGame} repeatGame={repeatGame} />;
          }
        })()}
      </main>
    </>
  );
};
