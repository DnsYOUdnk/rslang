import cl from './MainPage.module.css';
import cn from 'classnames';
import { Button } from '../../components/Button/Button';
import { Link } from 'react-router-dom';
import { MainPageProps } from './MainPage.props';

export const MainPage = ({ className, ...props }: MainPageProps): JSX.Element => {
  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.about}>
        <h2 className={cl.title}>Учи английский эффективно с RSLang</h2>
        <div className={cl.buttons__wrap}>
          <Link to='/about'>
            <Button className={cl.button}>Подробнее</Button>
          </Link>
          <Link to='/team'>
            <Button>Наша команда</Button>
          </Link>
        </div>
      </div>
      <div className={cl.learn}>
        <Link to='/book' className={cn(cl.learn__link, cl.book)}>
          <div className={cl.learn__title}>Учебник</div>
        </Link>
        <Link to='/audio' className={cn(cl.learn__link, cl.audio)}>
          <div className={cl.learn__title}>Аудиовызов</div>
        </Link>
        <Link to='/sprint' className={cn(cl.learn__link, cl.sprint)}>
          <div className={cl.learn__title}>Спринт</div>
        </Link>
      </div>
    </main>
  );
};