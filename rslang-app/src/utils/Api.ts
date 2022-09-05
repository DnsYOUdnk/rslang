import { Word, UserWord, UserData, AgregatedWords, UserStatistics } from '../common/types';
import axios, { AxiosError } from 'axios';

const URL = 'https://react-learn-language.herokuapp.com';

export default function removeUserDataFromStorage() {
  localStorage.removeItem('userData');
  window.dispatchEvent(new CustomEvent('localStorageChange'));
}

type Params = {
  wordsPerPage?: number;
  group?: number;
  page?: number;
  filter?: unknown;
}

export function getWords(params?: Params) {
  return axios
    .get<Word[]>(`${URL}/words`, { params, })
    .then((response) => response.data)
    .catch((err) => console.log('Error getWords', err));
}

export const getWordsRequest = async (group: number, page: number) => {
  const response = await fetch(`${URL}words?group=${group}&page=${page}`);
  return response;
};


type RequestBody = {
  difficulty?: string;
  learnedWords?: number;
  optional: {
    [key: string]: unknown;
  };
};

export function createUserWord(wordId: string, userId: string, token: string, requestBody: RequestBody) {
  return axios
    .post<UserWord>(`${URL}/users/${userId}/words/${wordId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
};

export function getUserWordById(wordId: string, userId: string, token: string) {
  return axios
    .get<UserWord>(`${URL}/users/${userId}/words/${wordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
};

export function updateUserWord(wordId: string, userId: string, token: string, requestBody: RequestBody) {
  return axios
    .put<UserWord>(`${URL}/users/${userId}/words/${wordId}`, requestBody, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    })
    .then((response) => response.data)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
};

export function getUserAggregatedWords(userId: string, token: string, params?: Params) {
  return axios
    .get<AgregatedWords>(`${URL}/users/${userId}/aggregatedWords`, { 
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
      params,
    })
    .then((response) => response.data[0].paginatedResults)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
};

