import cn from 'classnames';
import React from 'react';
import cl from './TextBookPageNav.module.css';

type Props = {
  group: {
    activeGroup: string;
    setActiveGroup: React.Dispatch<React.SetStateAction<string>>;
  };
  page: {
    activePage: number;
    setActivePage: React.Dispatch<React.SetStateAction<number>>;
  };
};

export default function TextBookPageNav({ group, page }: Props) {
  const navItems = [];
  navItems[0] = 1;
  navItems[6] = 30;
  if (page.activePage < 5) {
    navItems[1] = 2;
    navItems[2] = 3;
    navItems[3] = 4;
    navItems[4] = 5;
    navItems[5] = '...';
  } else if (page.activePage > 26) {
    navItems[1] = '...';
    navItems[2] = 26;
    navItems[3] = 27;
    navItems[4] = 28;
    navItems[5] = 29;
  } else {
    navItems[1] = '...';
    navItems[2] = page.activePage - 1;
    navItems[3] = page.activePage;
    navItems[4] = page.activePage + 1;
    navItems[5] = '...';
  }

  const prevPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page.activePage <= 1) e.preventDefault();
  };

  const nextPage = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (page.activePage >= 30) e.preventDefault();
  };

  return (
    <nav className={cl.textbookPageNav}>
      <ul className={cl.textbookPageNav__list}>
        <li className={cl.textbookPageNav__listItem} key={'textbookPage_prev'}>
          <a
            className={cl.buttonPrev}
            href={`#/textbook/${group.activeGroup}/${page.activePage - 1}`}
            onClick={prevPage}
            role="button"
          ></a>
        </li>
        {navItems.map((navItemPage: string | number, index: number) => {
          return typeof navItemPage === 'string' ? (
            <li
              className={cn(cl.textbookPageNav__listItem)}
              key={`textbookPage_${index}`}
            >
              {' '}
              <span className={cl.textbookPageNav__link}>{navItemPage}</span>{' '}
            </li>
          ) : (
            <li
              className={`textbookPageNav__listItem textbookPageNav__listItem_pageNumber ${page.activePage === +navItemPage ? `textbookPageNav__listItem_active-${group.activeGroup}` : ''
              }`}
              key={`textbookPage_${index}`}
            >
              <a
                className={cl.textbookPageNav__link}
                href={`#/textbook/${group.activeGroup}/${navItemPage}`}
                role="button"
              >
                {navItemPage}
              </a>
            </li>
          );
        })}
        <li className={cl.textbookPageNav__listItem} key={'textbookPage_next'}>
          <a
            className={cl.buttonNext}
            href={`#/textbook/${group.activeGroup}/${page.activePage + 1}`}
            onClick={nextPage}
            role="button"
          ></a>
        </li>
      </ul>
    </nav>
  );
}
