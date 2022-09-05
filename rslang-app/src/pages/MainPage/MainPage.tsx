import cl from './MainPage.module.css';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { MainPageProps } from './MainPage.props';
import { links } from '../../common';

export const MainPage = ({ className, ...props }: MainPageProps): JSX.Element => {
  const buttons = [
    { link: '/about', text: 'Подробнее', id: 1 },
    { link: '/team', text: 'Наша команда', id: 2 },
  ];
  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.about}>
        <h2 className={cl.title}>Учи английский эффективно с RSLang</h2>
        <div className={cl.buttons__wrap}>
          {buttons.map((item) => (
            <Link to={item.link} key={item.id}>
              <Button className={cl.button}>{item.text}</Button>
            </Link>
          ))}
        </div>
      </div>
      <div className={cl.learn}>
        {links.map((item) => (
          <Link
            to={item.link}
            className={cn(cl.learn__link, {
              [cl.book]: item.class === 'book',
              [cl.audio]: item.class === 'audio',
              [cl.sprint]: item.class === 'sprint',
            })}
            key={item.id}
          >
            <div className={cl.learn__title}>{item.text}</div>
          </Link>
        ))}
      </div>
    </main>
  );
};
