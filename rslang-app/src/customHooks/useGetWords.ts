import { useEffect, useState } from 'react';
import { IWord } from '../types/dataWordTypes';
import { getWordsRequest } from '../utils/getWordsRequest';

const DEFAULT_QUANTITY_PAGES = 30;

export const useGetWords = () => {
  const [ number, setNumber ] = useState<IWord[]>([]);
  const [ onLoading, setOnLoading ] = useState(false);

  const getWords = async (group: number): Promise<void> => {
    setOnLoading(true);
    const pageArr: null[] = new Array(DEFAULT_QUANTITY_PAGES).fill(null);
    const promiseArr = pageArr.map((_, page) => getWordsRequest(group, page));
    const responseArr = await Promise.all(promiseArr);
    const response: Array<Array<IWord>> = await Promise.all(responseArr.map(res => res.json()));
    setNumber(response.flat())
  }

  useEffect(() => {
    if(number.length >= 30) {
      setOnLoading(false);
    }
  },[number])

  return {onLoading, number, getWords};
}
