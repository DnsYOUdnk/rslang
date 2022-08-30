const BASE_URL = 'https://react-learn-language.herokuapp.com/';


export const getWordsRequest = async (group: number, page: number) => {
  const response = await fetch(`${BASE_URL}words?group=${group}&page=${page}`)
  return response;
};
