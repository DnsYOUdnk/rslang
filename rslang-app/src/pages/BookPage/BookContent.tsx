import React from 'react';
import cn from 'classnames';
import styleBook from './BookContent.module.css';

const BookContent = () => {
  return (
    <div className={cn(styleBook.BookContent)}>
      BookContent
    </div>
  );
};

export default BookContent;