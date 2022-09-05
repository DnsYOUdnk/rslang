import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import cl from './TextBook.module.css';
import { UserData } from '../../common/types';
import TextBookNav from './TextBookNav/TextBookNav';
import TextBookPage from './TextBookPage/TextBookPage';
import { Footer } from '../../components/Footer/Footer';
import { Header } from '../../components/Header/Header';

const TextBook = () => {
  const [activeGroup, setActiveGroup] = useState('A1'); {/* ('') */}
  const [activePage, setActivePage] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [disabledGameButtons, setDisabledGameButtons] = useState(false);

  return (
    <div>

      <div className={cl.textbook}>
        <Header />
        <div className={cl.textbook__header}>
          <TextBookNav
            group={{ activeGroup, setActiveGroup }}
            page={{ activePage, setActivePage }}
            gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
          />
        </div>

        <div className={cl.textbook__main_A1}>
          <TextBookPage
            group={{ activeGroup, setActiveGroup }}
            page={{ activePage, setActivePage }}
            authorization={{ userData, setUserData }}
            gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
            key={`${activeGroup}_${activePage}`}
          />
        </div>
        <Footer />
      </div>
    </div>

  );
};

export default TextBook;