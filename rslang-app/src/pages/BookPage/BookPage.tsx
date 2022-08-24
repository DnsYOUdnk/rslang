import React from 'react';
import cn from 'classnames';
import styleBook from './BookPage.module.css';
import BookContent from './BookContent';
import BookMenu from './BookMenu/BookMenu';


const BookPage = () => {
  return (
    <div className={cn(styleBook.BookPage)}>
      <BookMenu />
      <BookContent />
    </div>
  );
};

export default BookPage;