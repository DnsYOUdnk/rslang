import React from 'react';
import cn from 'classnames';
import styleBook from './BookMenu.module.css';
import HomeLink from '../../../components/Buttons/HomeLink';
import BookGames from './BookGames';
import BookPagination from './BookPagination';
import BookLevel from './BookLevel';

const BookMenu = () => {

  return (
    <div className={cn(styleBook.BookMenu)}>
      <HomeLink />
      <BookGames />
      <BookPagination />
      <BookLevel />
    </div>
  );
};

export default BookMenu;