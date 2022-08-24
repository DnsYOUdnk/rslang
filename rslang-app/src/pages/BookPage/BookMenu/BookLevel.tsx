import cn from 'classnames';
import React, { useState } from 'react';
import styleMenu from './BookMenu.module.css';
import styleBook from '../BookPage.module.css';

const BookLevel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className={cn(
      styleMenu.LevelMenu, 
      styleMenu.LevelMenuToggle,
      styleBook.Level4)}>
      4
    </div>
  );
};

export default BookLevel;

