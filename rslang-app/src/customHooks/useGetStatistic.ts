import { getUserStatisticRequest, updateUserStatisticRequest } from './../utils/getUserStatisticRequest';
import { IUser } from './../types/userLoggedTypes';
import { IOptional, IOptionStatistic, IStatistic } from './../types/dataStatisticTypes';
import { useState } from 'react';

const STATUS_OK = 200;

export const defaultStatistic = () => {
  const DEFAULT_STATISTIC = {
    learnedWords: 0,
    optional: {}
  } as {learnedWords: number, optional: IOptional}
  const arrStat = ['commonData', 'audiocall', 'sprint'];
  const defaultOptional = {
    learnedWords: 0,
    newWords: 0,
    procCorrectWord: 0,
    bestSeries: 0
  };
  const date = new Date().toLocaleDateString();
  arrStat.forEach((gameName) => {
    const objStat = {} as {[key: string]: IOptionStatistic};
    objStat[date] = JSON.parse(JSON.stringify(defaultOptional));
    DEFAULT_STATISTIC.optional[gameName] = objStat;
  })
  return DEFAULT_STATISTIC;
}

export const useGetStatistic = () => {
  const [statistic, setStatistic] = useState({} as IStatistic);
  const [isGetStatic, setIsGetStatic] = useState(false);

  const localUserLogged: IUser = JSON.parse(localStorage.user || '{}');
  const {userId, token} = localUserLogged;

  const updateStatistic = async (bodyStatistic: IStatistic) => {
    if (localUserLogged.status === STATUS_OK) {
      const responseStat = await updateUserStatisticRequest(userId, token, bodyStatistic);
      if(responseStat.status === 200 ) {
        const response = await responseStat.json();
        setStatistic(response);
        return response
      }
    }
  }

  const getStatistic = async () => {
    if (localUserLogged.status === STATUS_OK) {
      const responseStat = await getUserStatisticRequest(userId, token);
      if(responseStat.status === 404 ) {
        const bodyStat = defaultStatistic();
        await updateStatistic(bodyStat);
        return
      }
      const response = responseStat as IStatistic;
      setStatistic(response)
      setIsGetStatic(true);
      return response;
    }
  }

  return { statistic, setStatistic, isGetStatic, getStatistic, updateStatistic}
}