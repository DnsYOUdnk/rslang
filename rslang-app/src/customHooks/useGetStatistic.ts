import { getUserStatisticRequest, updateUserStatisticRequest } from './../utils/getUserStatisticRequest';
import { IUser } from './../types/userLoggedTypes';
import { IStatistic } from './../types/dataStatisticTypes';
import { useState } from 'react';
import { getDefaultObjStatistic } from '../utils/getDefaultObjStatistic';

const STATUS_OK = 200;

export const useGetStatistic = () => {
  const [statistic, setStatistic] = useState({} as IStatistic);
  const [isGetStatic, setIsGetStatic] = useState(false);

  const localUserLogged: IUser = JSON.parse(localStorage.user || '{}');
  const { userId, token } = localUserLogged;

  const updateStatistic = async (bodyStatistic: IStatistic) => {
    if (localUserLogged.status === STATUS_OK) {
      const responseStat = await updateUserStatisticRequest(userId, token, bodyStatistic);
      if (responseStat.status === 200) {
        const response = await responseStat.json();
        setStatistic(response);
        return response;
      }
    }
  };

  const getStatistic = async () => {
    if (localUserLogged.status === STATUS_OK) {
      const responseStat = await getUserStatisticRequest(userId, token);
      if (responseStat.status === 404) {
        const bodyStat = getDefaultObjStatistic();
        await updateStatistic(bodyStat);
        return;
      }
      const response = responseStat as IStatistic;
      setStatistic(response);
      setIsGetStatic(true);
      return response;
    }
  };

  return { statistic, setStatistic, isGetStatic, getStatistic, updateStatistic };
};
