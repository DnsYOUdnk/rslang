import { IUser } from './../types/userLoggedTypes';
const BASE_URL = 'https://react-learn-language.herokuapp.com/';
const WORD_PER_PAGE = 20;

export const getWordsRequest = async (group: number, page: number) => {
  const response = await fetch(`${BASE_URL}words?group=${group}&page=${page}`);
  return response;
};

export const getUserWordsRequest = async (group: number, page: number, localUserLogged: IUser) => {
  const { userId, token } = localUserLogged;
  const response = await fetch(
    `${BASE_URL}users/${userId}/aggregatedWords?group=${group}&wordsPerPage=${page * WORD_PER_PAGE}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  )
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        return { status: res.status };
      }
      return res.json();
    })
    .then((res) => {
      if (res.status) {
        return res;
      }
      return res[0].paginatedResults;
    });
  return response;
};
