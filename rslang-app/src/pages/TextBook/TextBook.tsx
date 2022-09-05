import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import cl from './TextBook.module.css';
import { UserData } from '../../common/types';
import TextBookNav from './TextBookNav/TextBookNav';
import TextBookPage from './TextBookPage/TextBookPage';

const BookPage = () => {
  const [activeGroup, setActiveGroup] = useState('A1'); {/* ('') */}
  const [activePage, setActivePage] = useState(1);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [disabledGameButtons, setDisabledGameButtons] = useState(false);

  return (
    <div className={cl.textbook}>
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
    </div>
  );
};

export default BookPage;