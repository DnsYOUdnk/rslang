import { IStatistic } from './../types/dataStatisticTypes';
const BASE_URL = 'https://react-learn-language.herokuapp.com/';

export const getUserStatisticRequest = async (userId: string, token: string) => {
  const response = await fetch(`${BASE_URL}users/${userId}/statistics`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  }).then((res) => {
    if (res.status === 404) {
      return { status: res.status };
    }
    return res.json();
  });
  return response;
};

export const updateUserStatisticRequest = async (userId: string, token: string, statistic: IStatistic) => {
  if (statistic.id) delete statistic.id;
  const response = await fetch(`${BASE_URL}users/${userId}/statistics`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(statistic),
  });
  return response;
};
