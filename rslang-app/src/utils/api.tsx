import { Word, UserWord, UserData, AgregatedWords } from '../types/types';
import axios, { AxiosError } from 'axios';

const base = 'https://react-learn-language.herokuapp.com/';
const URL = 'https://react-learn-language.herokuapp.com';

const addInLocalStorage = (name: string, user: string) => {
  localStorage.setItem(name, user);
};

export const createUser = async (
  name: string,
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const response = await fetch(`${base}users`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  })
    .then((res) => {
      if (res.status >= 400 && res.status < 600) {
        return res.status;
      }
      return res.status;
    })
    .catch((error) => {
      return error.statusCode;
    });
  setIsLoading(false);
  return response;
};

export const logIn = async (
  email: string,
  password: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const response = await fetch(`${base}signin`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  }).then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return { status: res.status };
    }
    return res.json();
  });
  const user = { status: 200, ...response };
  if (user.status === 200) {
    addInLocalStorage('user', JSON.stringify(user));
  }
  setIsLoading(false);
  return user;
};

export const getStatistic = async (usersId: string, token: string) => {
  const response = await fetch(`${base}users/${usersId}/statistics`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.status >= 400 && res.status < 600) {
      return { status: res.status };
    }
    return res.json();
  });

  return { status: 200, ...response };
};

export default function removeUserDataFromStorage() {
  localStorage.removeItem('userData');
  window.dispatchEvent(new CustomEvent('localStorageChange'));
}

type Params = {
  wordsPerPage?: number;
  group?: number;
  page?: number;
  filter?: unknown;
};

export function getWords(params?: Params) {
  return axios
    .get<Word[]>(`${URL}/words`, { params })
    .then((response) => response.data)
    .catch((err) => console.log('Error getWords', err));
}

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
}

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
}

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
}

export function getUserAggregatedWords(userId: string, token: string, params?: Params) {
  return axios
    .get<AgregatedWords>(`${URL}/users/${userId}/aggregatedWords`, {
      headers: { Authorization: `Bearer ${token}`, Accept: 'application/json', },
      params,
    })
    .then((response) => response.data[0].paginatedResults)
    .catch((err: AxiosError) => {
      if (err.response?.status === 401) removeUserDataFromStorage();
      return new Error(String(err.response?.status));
    });
}

export const getWordsRequest = async (group: number, page: number) => {
  const response = await fetch(`${URL}words?group=${group}&page=${page}`);
  return response;
};

export function isUserData(obj: any): obj is UserData {
  return 'id' in obj && 'token' in obj;
}
