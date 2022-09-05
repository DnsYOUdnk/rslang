import { IUserWord, IWord } from './../types/dataWordTypes';

const BASE_URL = 'https://react-learn-language.herokuapp.com/';

export const createUserWord = async (randomLearnWord: IWord) => {
  const { userId, token } = JSON.parse(localStorage.user);
  const response = await fetch(`${BASE_URL}users/${userId}/words/${randomLearnWord._id}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty: 'unknown',
      optional: {
        countCorrectSeries: 0,
        numberUses: 0,
        countLearn: 0,
        isWordLearned: false,
      },
    }),
  });
  return response;
};

export const updateUserWord = async ({ wordId, difficulty, optional }: IUserWord) => {
  const { userId, token } = JSON.parse(localStorage.user);
  const response = await fetch(`${BASE_URL}users/${userId}/words/${wordId}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      difficulty,
      optional,
    }),
  });
  return response;
};
