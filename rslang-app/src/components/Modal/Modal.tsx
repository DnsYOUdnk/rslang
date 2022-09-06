import cn from 'classnames';
import { useState } from 'react';
import { createUser, logIn } from '../../utils/api';
import { validateEmail, validateValue } from '../../utils/validator';
import { Answer } from '../Answer/Answer';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);

  const [isValidateName, setIsValidateName] = useState(false);
  const [isValidateEmail, setIsValidateEmail] = useState(false);
  const [isValidatePassword, setIsValidatePassword] = useState(false);
  const isValidateFormLogin = isValidateEmail && isValidatePassword;
  const isValidateFormRegistation = isValidateName && isValidateEmail && isValidatePassword;

  const closeModal = () => setIsOpenModal(!isOpenModal);
  const log = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, operation: string) => {
    e.preventDefault();
    setIsLoading(true);
    switch (operation) {
      case 'logIn': {
        const response = await logIn(emailValue, passwordValue, setIsLoading);
        setStatusCode(response.status);
        if (response.status === 200) {
          setIsOpenModal(false);
          setIsAuthorized(true);
        }
        break;
      }

      case 'singUp': {
        const responseCode = await createUser(nameValue, emailValue, passwordValue, setIsLoading);
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
    <>
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

        {!isValidateName && activeButton === 'singUp' && (
          <div className={cl.validate}>Имя пользователя меньше 2 символов</div>
        )}
        <div>
          {activeButton === 'singUp' && (
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
                className={cn(cl.form__control, {
                  [cl.form__invalid]: isValidateName === false,
                })}
                value={nameValue}
                onChange={(e) => {
                  setNameValue(e.target.value);
                  setIsValidateName(validateValue(2, e.target.value));
                  setStatusCode(0);
                }}
              ></input>
            </div>
          )}
          <Answer statusCode={statusCode} />
          {!isValidateEmail && <div className={cl.validate}>Такого e-mail не существует</div>}
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
              className={cn(cl.form__control, {
                [cl.form__invalid]: !isValidateEmail,
              })}
              value={emailValue}
              onChange={(e) => {
                setStatusCode(0);
                setEmailValue(e.target.value);
                setIsValidateEmail(!!validateEmail(e.target.value));
              }}
            ></input>
          </div>
          {!isValidatePassword && <div className={cl.validate}>Длина пароля меньше 6 символов</div>}
          <div className={cl.form__group}>
            <label className={cl.form__label} htmlFor='password'>
              Пароль:
            </label>
            <input
              type={isPasswordShow ? 'text' : 'password'}
              placeholder='пароль'
              name='password'
              autoComplete='current-password'
              required
              id='password'
              className={cn(cl.form__control, {
                [cl.form__invalid]: isValidatePassword === false,
              })}
              value={passwordValue}
              onChange={(e) => {
                setStatusCode(0);
                setPasswordValue(e.target.value);
                setIsValidatePassword(validateValue(6, e.target.value));
              }}
            ></input>
            <div className={cl.password} onClick={() => setIsPasswordShow(!isPasswordShow)}>
              {<img src={isPasswordShow ? '/icons/show_password.svg' : '/icons/hide_password.svg'} alt='eye' />}
            </div>
          </div>
        </div>
        <Button
          type='submit'
          className={cl.form__button}
          onClick={(e) => log(e, activeButton)}
          disabled={activeButton === 'logIn' ? !isValidateFormLogin : !isValidateFormRegistation}
        >
          {activeButton == 'logIn' ? 'Войти' : 'Зарегестрироваться'}
        </Button>
        <div className={cl.closeModal} onClick={closeModal}></div>
      </form>
      {isLoading ? <Loader /> : ''}
    </>
  );
};
