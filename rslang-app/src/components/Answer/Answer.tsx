import { AnswerProps } from './Answer.props';
import cl from './Answer.module.css';
import cn from 'classnames';

export const Answer = ({ statusCode, className, ...props }: AnswerProps): JSX.Element => {
  return (
    <>
      {statusCode === 200 ? (
        <div className={cl.sign__up}>
          <img src='/icons/ok.svg' alt='ok' className={cl.icon} />
          <span>Регистрация прошла успешно. Войдите в аккаунт</span>
        </div>
      ) : statusCode === 417 ? (
        <div className={cn(cl.sign__up, cl.error)}>
          <img src='/icons/block.svg' alt='block' className={cl.icon} />
          <span>Пользователь с таким e-mail уже существует</span>
        </div>
      ) : statusCode === 403 || statusCode === 404 ? (
        <div className={cn(cl.sign__up, cl.error)}>
          <img src='/icons/block.svg' alt='block' className={cl.icon} />
          <span>Неправильный логин или пароль</span>
        </div>
      ) : statusCode === 422 ? (
        <div className={cn(cl.sign__up, cl.error)}>
          <img src='/icons/block.svg' alt='block' className={cl.icon} />
          <span>Укажите имя пользователя</span>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
