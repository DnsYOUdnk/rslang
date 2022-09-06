import React from 'react';
import cl from './TextBookNav.module.css';
import cn from 'classnames';
import NavBtn from '../../../components/NavBtn/NavBtn';
import { Link } from 'react-router-dom';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
  gamesButtonsState: {
    disabledGameButtons: boolean;
    setDisabledGameButtons: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

export default function TextBookNav({ group, page, gamesButtonsState }: Props) {
  return (
    <nav className={cl.bookNav}>
      <ul className={cl.bookNav__list}>
        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/A1/1'}>
            <NavBtn className={cl.levelA1} label='A1' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          {/* <Link to={'#/textbook/A2/1'} key={'textbook/A2/1'} className={cl.bookNav__link}>
            <NavBtn
              className={cl.levelA2}
              label='A2'
            />
          </Link> */}
          <a className={cl.bookNav__link} href={'#/textbook/A2/1'}>
            <NavBtn className={cl.levelA2} label='A2' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/B1/1'}>
            <NavBtn className={cl.levelB1} label='B1' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/B1/1'}>
            <NavBtn className={cl.levelB2} label='B2' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/C1/1'}>
            <NavBtn className={cl.levelC1} label='C1' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/C2/1'}>
            <NavBtn className={cl.levelC2} label='C2' />
          </a>
        </li>

        <li className={cn(cl.bookNav__listItem)}>
          <a className={cl.bookNav__link} href={'#/textbook/difficultWords/1'}>
            <span className={cn(cl.levelCard, cl.btn2, cl.book, cl.bookNav__levelCard)}>
              <span className={cl.levelCard__name}>Proficiency</span>
              <span className={cn(cl.levelCard__level)}>Сложные слова</span>
            </span>
          </a>
        </li>
      </ul>

      <ul className={cl.bookNav__list}>
        <li className={cl.bookNav__listItem}>
          <a className={cl.bookNav__link} href={'#/Audiocall'}>
            <button className={cl.btn2}>
              <span className={cl.bookNav__linkText}>Аудиовызов</span>
            </button>
          </a>
        </li>

        <li className={cl.bookNav__listItem}>
          <a className={cl.bookNav__link} href={'#/sprint'}>
            <button className={cl.btn2}>
              <span className={cl.bookNav__linkText}>Спринт</span>
            </button>
          </a>
        </li>
      </ul>
    </nav>
  );
}
