import { useEffect, useState } from 'react';
import { ILocalDataWords, IWord } from '../types/dataWordTypes';
import { IUser } from '../types/userLoggedTypes';
import { getUserWordsRequest, getWordsRequest } from '../utils/getWordsRequest';

const DEFAULT_QUANTITY_PAGES = 30;
const STATUS_OK = 200;

export const useGetWords = () => {
  const [listWords, setListWords] = useState<IWord[]>([]);
  const [onLoading, setOnLoading] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const getWords = async (group: number): Promise<void> => {
    setOnLoading(true);
    const localDataWords: ILocalDataWords = JSON.parse(localStorage.localDataWorlds || '{}');
    const localUserLogged: IUser = JSON.parse(localStorage.user || '{}');

    if (localUserLogged.status === STATUS_OK) {
      setIsUserLogged(true);
      localStorage.removeItem('localDataWorlds');

      const responseArrWord = await getUserWordsRequest(group, DEFAULT_QUANTITY_PAGES, localUserLogged);
      const response = responseArrWord;

      if (response.status) setOnLoading(false);
      setListWords(response);
    } else {
      const pageArr: null[] = new Array(DEFAULT_QUANTITY_PAGES).fill(null);

      if (!localDataWords[group]) {
        const promiseArr = pageArr.map((_, page) => getWordsRequest(group, page));
        const responseArr = await Promise.all(promiseArr);
        const response: Array<Array<IWord>> = await Promise.all(responseArr.map((res) => res.json()));
        localDataWords[group] = { ...response };
        localStorage.setItem('localDataWorlds', JSON.stringify(localDataWords));
        setListWords(response.flat());
      } else {
        setListWords(pageArr.map((_, page) => localDataWords[group][page]).flat());
      }
    }
  };

  useEffect(() => {
    if (listWords.length >= 20) {
      setOnLoading(false);
    }
  }, [listWords]);

  return { onLoading, listWords, isUserLogged, getWords };
};
