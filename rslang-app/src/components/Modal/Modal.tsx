import cn from 'classnames';
import { useState } from 'react';
import { createUser, logIn } from '../../utils/authorization';
import { Button } from '../Button/Button';
import cl from './Modal.module.css';
import { ModalProps } from './Modal.props';

export const Modal = ({
  isOpenModal,
  setIsOpenModal,
  className,
  setIsAuthorized,
  ...props
}: ModalProps): JSX.Element => {
  const [activeButton, setActiveButton] = useState('logIn');

  const [nameValue, setNameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [statusCode, setStatusCode] = useState(0);

  const closeModal = () => setIsOpenModal(!isOpenModal);
  const log = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, operation: string) => {
    e.preventDefault();
    switch (operation) {
      case 'logIn': {
        const response = await logIn(emailValue, passwordValue);
        setStatusCode(response.status);
        if (response.status === 200) {
          setIsOpenModal(false);
          setIsAuthorized(true);
        }
        break;
      }

      case 'singUp': {
        const responseCode = await createUser(nameValue, emailValue, passwordValue);
        setStatusCode(responseCode);
        if (responseCode === 200) {
          setActiveButton('logIn');
          setNameValue('');
          setEmailValue('');
          setPasswordValue('');
        }

        break;
      }
    }
  };

  return (
    <form className={cl.form}>
      <div className={cl.form__switch}>
        <div
          className={cn(cl.title__ent, { [cl.title__active]: activeButton == 'logIn' })}
          onClick={() => {
            setActiveButton('logIn');
            setStatusCode(0);
          }}
        >
          Вход
        </div>
        <div
          className={cn(cl.title__reg, { [cl.title__active]: activeButton == 'singUp' })}
          onClick={() => {
            setActiveButton('singUp');
            setStatusCode(0);
          }}
        >
          Регистрация
        </div>
      </div>
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
      ) : (
        ''
      )}
      <div className={cl.form__wrap}>
        {activeButton === 'singUp' ? (
          <div className={cl.form__group}>
            <label className={cl.form__label} htmlFor='username'>
              Имя:
            </label>
            <input
              placeholder='имя'
              name='username'
              autoComplete='username'
              required
              id='username'
              className={cl.form__control}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
            ></input>
          </div>
        ) : (
          ''
        )}
        <div className={cl.form__group}>
          <label className={cl.form__label} htmlFor='login'>
            Логин:
          </label>
          <input
            placeholder='e-mail'
            name='login'
            autoComplete='login'
            required
            id='login'
            className={cl.form__control}
            value={emailValue}
            onChange={(e) => {
              setStatusCode(0);
              setEmailValue(e.target.value);
            }}
          ></input>
        </div>
        <div className={cl.form__group}>
          <label className={cl.form__label} htmlFor='password'>
            Пароль:
          </label>
          <input
            type='password'
            placeholder='пароль'
            name='password'
            autoComplete='current-password'
            required
            id='password'
            className={cl.form__control}
            value={passwordValue}
            onChange={(e) => {
              setStatusCode(0);
              setPasswordValue(e.target.value);
            }}
          ></input>
        </div>
      </div>
      <Button type='submit' className={cl.form__button} onClick={(e) => log(e, activeButton)}>
        {activeButton == 'logIn' ? 'Войти' : 'Зарегестрироваться'}
      </Button>
      <div className={cl.closeModal} onClick={closeModal}></div>
    </form>
  );
};
