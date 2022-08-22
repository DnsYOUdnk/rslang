import { ModalProps } from './Modal.props';
import cl from './Modal.module.css';
import cn from 'classnames';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../Button/Button';

export const Modal = ({
  isOpenModal,
  setIsOpenModal,
  className,
  ...props
}: ModalProps): JSX.Element => {
  const [activeButton, setActiveButton] = useState('1');

  const closeModal = () => setIsOpenModal(!isOpenModal);
  return (
    <form className={cl.form}>
      <div className={cl.form__switch}>
        <div
          className={cn(cl.title__reg, { [cl.title__active]: activeButton == '1' })}
          onClick={() => setActiveButton('1')}
        >
          Вход
        </div>
        <div
          className={cn(cl.title__ent, { [cl.title__active]: activeButton == '0' })}
          onClick={() => setActiveButton('0')}
        >
          Регистрация
        </div>
      </div>
      <div className={cl.form__wrap}>
        <div className={cl.form__group}>
          <label className={cl.form__label} htmlFor='username'>
            Логин:
          </label>
          <input
            placeholder='e-mail'
            name='username'
            autoComplete='username'
            required
            id='username'
            className={cl.form__control}
          ></input>
        </div>
        <div className={cl.form__group}>
          <label className={cl.form__label} htmlFor='password'>
            Пароль:
          </label>
          <input
            placeholder='пароль'
            name='password'
            autoComplete='current-password'
            required
            id='password'
            className={cl.form__control}
          ></input>
        </div>
      </div>
      <Button type='submit' className={cl.form__button}>
        {activeButton == '1' ? 'Войти' : 'Зарегестрироваться'}
      </Button>
      <div className={cl.closeModal} onClick={closeModal}></div>
    </form>
  );
};
