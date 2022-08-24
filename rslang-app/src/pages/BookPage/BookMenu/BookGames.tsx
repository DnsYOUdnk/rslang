import React from 'react';
import cn from 'classnames';
import styleBook from './BookMenu.module.css';
import Button from '../../../components/Buttons/Button';

function BookGames () {
  return (
    <div className={cn(styleBook.BookGames)}>
      <Button 
        className={cn(styleBook.NavigationLink, styleBook.GameMenuToggler)}
        label = 'Спринт' />
      <Button
        className={cn(styleBook.NavigationLink, styleBook.GameMenuToggler)}
        label='Аудиовызов' />
    </div>
  );
};

export default BookGames;
