import cn from 'classnames';
import { StatisticPageProps } from './StatisticPage.props';
import cl from './StatisticPage.module.css';
import { useContext, useEffect, useState } from 'react';
import { Context, ContextStatistic } from '../../utils/context';
import { getStatistic } from '../../utils/api';
import { getTodayData } from '../../utils/getTodayData';
import { Chart } from '../../components/Chart/Chart';

export const StatisticPage = ({ className, ...props }: StatisticPageProps): JSX.Element => {
  const context = useContext(Context);
  const contextStatistic = useContext(ContextStatistic);
  const [statistic, setStatistic] = useState(contextStatistic);
  const [statusCode, setStatusCode] = useState(0);

  const getStatisticByGame = (game: string) => {
    const statisticByGame = game === 'sprint' ? statistic.optional.sprint : statistic.optional.audiocall;
    return [
      `Изучено новых ${statisticByGame[getTodayData()].newWords} слов`,
      `Правильных ответов: ${statisticByGame[getTodayData()].procCorrectWord}%`,
      `Самая длинная серия правильных ответов: ${statisticByGame[getTodayData()].bestSeries}.`,
    ];
  };

  useEffect(() => {
    if (context?.isAuthorized === true) {
      const fetchData = async () => {
        const user = JSON.parse(localStorage.user);
        const response = await getStatistic(user.userId, user.token);
        setStatusCode(response.status);
        if (response.status === 200) {
          setStatistic(response);
        }
      };
      fetchData();
    }
  }, [context]);
  return (
    <main className={cn(className, cl.main)}>
      {context?.isAuthorized && (statusCode === 200 || statusCode === 401 || statusCode === 404) ? (
        <>
          <h2 className={cl.title}>
            <span>Статистика за сегодня</span>
          </h2>
          <div className={cl.today}>
            <div className={cl.lernedWords}>
              {statistic.optional.commonData[getTodayData()].newWords}
              <br />
              <span>новых слов</span>
            </div>
            <div className={cl.lernedWords}>
              {statistic.optional.commonData[getTodayData()].learnedWords}
              <br />
              <span>слов изучено</span>
            </div>
            <div className={cl.lernedWords}>
              {statistic.optional.commonData[getTodayData()].procCorrectWord}
              %<br />
              <span>правильных ответов</span>
            </div>
          </div>
          <div className={cl.games__wrap}>
            <div className={cn(cl.game__item, cl.sprint)}>
              <div className={cl.title__games}>Спринт</div>
              {getStatisticByGame('sprint').map((item, i) => {
                return (
                  <div className={cl.info} key={i}>
                    <img src='/icons/bookmark.svg' alt='info-icon' className={cl.bookmark} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>

            <div className={cn(cl.game__item, cl.audiocall)}>
              <div className={cl.title__games}>Аудиовызов</div>
              {getStatisticByGame('audiocall').map((item, i) => {
                return (
                  <div className={cl.info} key={i}>
                    <img src='/icons/bookmark.svg' alt='info-icon' className={cl.bookmark} />
                    <span>{item}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <h2 className={cn(cl.title, cl.title__stat)}>
            <span>Статистика за всё время</span>
          </h2>
          <Chart statistic={statistic.optional.commonData} />
        </>
      ) : (
        <h3 className={cl.subtitle}>Страница доступна только авторизированным пользователям</h3>
      )}
    </main>
  );
};
