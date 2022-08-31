import { useEffect, useState } from 'react';
import { IWord } from '../types/dataWordTypes';
import { getWordsRequest } from '../utils/getWordsRequest';

const DEFAULT_QUANTITY_PAGES = 30;

export const useGetWords = () => {
  const [ listWords, setListWords ] = useState<IWord[]>([]);
  const [ onLoading, setOnLoading ] = useState(false);

  const getWords = async (group: number): Promise<void> => {
    setOnLoading(true);
    const pageArr: null[] = new Array(DEFAULT_QUANTITY_PAGES).fill(null);
    const promiseArr = pageArr.map((_, page) => getWordsRequest(group, page));
    const responseArr = await Promise.all(promiseArr);
    const response: Array<Array<IWord>> = await Promise.all(responseArr.map(res => res.json()));
    setListWords(response.flat())
  }

  useEffect(() => {
    if(listWords.length >= 30) {
      setOnLoading(false);
    }
  },[listWords])

  return {onLoading, listWords, getWords};
}
