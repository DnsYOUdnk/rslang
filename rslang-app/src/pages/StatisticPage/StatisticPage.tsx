import cn from 'classnames';
import { StatisticPageProps } from './StatisticPage.props';
import cl from './StatisticPage.module.css';
import { useEffect } from 'react';

export const StatisticPage = ({ className, ...props }: StatisticPageProps): JSX.Element => {
  const text = ['Изучено 0 слов', 'Правильных ответов: 0%', 'Самая длинная серия правильных ответов: 0.'];
  return (
    <main className={cn(className, cl.main)}>
      <h2 className={cl.title}>
        <span>Статистика за сегодня</span>
      </h2>
      <div className={cl.today}>
        <div className={cl.lernedWords}>
          0 <br />
          <span>слов изучено</span>
        </div>
        <div className={cl.lernedWords}>
          0% <br />
          <span>правильных ответов</span>
        </div>
      </div>
      <div className={cl.games__wrap}>
        <div className={cn(cl.game__item, cl.sprint)}>
          <div className={cl.title__games}>Спринт</div>
          {text.map((item, i) => {
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
          {text.map((item, i) => {
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
      <h3 className={cl.subtitle}>Страница доступна только авторизированным пользователям</h3>
    </main>
  );
};
