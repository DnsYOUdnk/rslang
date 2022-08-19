import { BodyProps } from './Body.props';
import cl from './Body.module.css';
import cn from 'classnames';
import { Button } from '../Button/Button';

export const Body = ({ className, ...props }: BodyProps): JSX.Element => {
  return (
    <main className={cn(className, cl.main)}>
      <div className={cl.about}>
        <h2 className={cl.title}>Учи английский эффективно с RSLang</h2>
        <div className={cl.buttons__wrap}>
          <Button className={cl.button}>Подробнее</Button>
          <Button>Наша команда</Button>
        </div>
      </div>
      <div className={cl.learn}>
        <a href='#' className={cn(cl.learn__link, cl.book)}>
          <div className={cl.learn__title}>Учебник</div>
        </a>
        <a href='#' className={cn(cl.learn__link, cl.audio)}>
          <div className={cl.learn__title}>Аудиовызов</div>
        </a>
        <a href='#' className={cn(cl.learn__link, cl.sprint)}>
          <div className={cl.learn__title}>Спринт</div>
        </a>
      </div>
    </main>
  );
};