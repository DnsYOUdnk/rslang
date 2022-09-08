import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router';
import cl from './TextBook.module.css';
import { User } from '../../types/types';
import TextBookNav from './TextBookNav/TextBookNav';
import TextBookPage from './TextBookPage/TextBookPage';

export const TextBook = () => {
  const [activeGroup, setActiveGroup] = useState('A1');
  const [activePage, setActivePage] = useState(1);
  const [user, setUser] = useState<User | null>(null);
  const [disabledGameButtons, setDisabledGameButtons] = useState(false);

  useEffect(() => {
    const checkUser = () => {
      const data = localStorage.getItem('user');
      if (data) {
        setUser(JSON.parse(data));
      } else setUser(null);
    };
    window.addEventListener('localStorageChange', checkUser);
    checkUser();
  }, []);

  return (
    <div className={cl.textbook}>
      <div className={cl.textbook__header}>
        <TextBookNav
          group={{ activeGroup, setActiveGroup }}
          page={{ activePage, setActivePage }}
          gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
        />
      </div>

      <div
        className={
          activeGroup == 'A1'
            ? cl.levelA1
            : activeGroup == 'A2'
            ? cl.levelA2
            : activeGroup == 'B1'
            ? cl.levelB1
            : activeGroup == 'B2'
            ? cl.levelB2
            : activeGroup == 'C1'
            ? cl.levelC1
            : activeGroup == 'C2'
            ? cl.levelC2
            : cl.textBookDifficult
        }
      >
        <Routes>
          <Route
            path=':groupId/:pageId'
            element={
              <TextBookPage
                group={{ activeGroup, setActiveGroup }}
                page={{ activePage, setActivePage }}
                authorization={{ user, setUser }}
                gamesButtonsState={{ disabledGameButtons, setDisabledGameButtons }}
                key={`${activeGroup}_${activePage}`}
              />
            }
          />
        </Routes>
      </div>
    </div>
  );
};
