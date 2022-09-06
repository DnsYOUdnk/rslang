import { IStatistic } from './../types/dataStatisticTypes';
import { IWord } from './../types/dataWordTypes';
import { defaultOptional, getDefaultObjStatistic } from './getDefaultObjStatistic';

const NUM_END_ARRAY = -1;

export const getUpdateObjStatistic = (
  resultWordsArr: IWord[],
  statistic: IStatistic,
  bestSeries: number,
  newWords: number,
  learnedWords: number,
): IStatistic => {
  const gameName = location.hash.split('/').slice(NUM_END_ARRAY).join('');
  const today = new Date().toLocaleDateString();
  const quantityCorrectWords = resultWordsArr.filter(({ correctAnswer }) => correctAnswer).length;
  const precent = Math.floor((quantityCorrectWords / resultWordsArr.length) * 100);
  let objStatistic = statistic;
  if (!Object.keys(objStatistic).length) {
    objStatistic = getDefaultObjStatistic();
  }
  let updateOptional = defaultOptional;
  if (objStatistic.optional[gameName][today]) {
    updateOptional = objStatistic.optional[gameName][today];
    updateOptional.bestSeries = defaultOptional.bestSeries < bestSeries ? bestSeries : defaultOptional.bestSeries;
    updateOptional.newWords += newWords;
    updateOptional.learnedWords += learnedWords;
    updateOptional.procCorrectWord =
      updateOptional.procCorrectWord !== 0 ? Math.floor((updateOptional.procCorrectWord + precent) / 2) : precent;
    objStatistic.optional[gameName][today] = updateOptional;
    if (objStatistic.optional.commonData[today]) {
      objStatistic.optional.commonData[today].learnedWords += learnedWords;
      const commonSeries = objStatistic.optional.commonData[today].bestSeries;
      objStatistic.optional.commonData[today].bestSeries = commonSeries < bestSeries ? bestSeries : commonSeries;
      const commonProc = objStatistic.optional.commonData[today].procCorrectWord;
      objStatistic.optional.commonData[today].procCorrectWord =
        commonProc !== 0 ? Math.floor((commonProc + precent) / 2) : precent;
      objStatistic.optional.commonData[today].newWords += newWords;
    } else {
      updateOptional.bestSeries = bestSeries;
      updateOptional.newWords = newWords;
      updateOptional.learnedWords = learnedWords;
      updateOptional.procCorrectWord = precent;
      objStatistic.optional.commonData[today] = updateOptional;
    }
  } else {
    updateOptional.bestSeries = bestSeries;
    updateOptional.newWords = newWords;
    updateOptional.learnedWords = learnedWords;
    updateOptional.procCorrectWord = precent;
    objStatistic.optional[gameName][today] = updateOptional;
  }

  return objStatistic;
};
