import React from 'react';
import cn from 'classnames';
import styleBookMenu from './BookMenu.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDoubleLeft,
  faAngleDoubleRight,
  faAngleLeft,
  faAngleRight,
} from '@fortawesome/free-solid-svg-icons';
import { BrowserRouter, Link } from 'react-router-dom';
import Button from '../../../components/Buttons/Button';

const paginationButtons = {
  leftEnd: faAngleDoubleLeft,
  left: faAngleLeft,
  right: faAngleRight,
  rightEnd: faAngleDoubleRight,
};

const BookPagination = () => {
  const pathBase = '/';
  function getPaginationButtonsValues () {
    return {
      leftEnd: pathBase,
      left: pathBase,
      right: pathBase,
      rightEnd: pathBase,
    }
  }

  const paginationGoTo = getPaginationButtonsValues();

  return (
    <div className={cn(styleBookMenu.Pagination)}>
      <BrowserRouter>
        <Link to={paginationGoTo.leftEnd}>
          <Button
            className={styleBookMenu.PaginationButton}
            label={<FontAwesomeIcon icon={paginationButtons.leftEnd} />}
          />
        </Link>

        <Link to={paginationGoTo.left}>
          <Button 
            className={styleBookMenu.PaginationButton}
            label={<FontAwesomeIcon icon={paginationButtons.left}/>}
          />
        </Link>

        Pagination

        <Link to={paginationGoTo.right}>
          <Button
            className={styleBookMenu.PaginationButton}
            label={<FontAwesomeIcon icon={paginationButtons.right}/>}
          />
        </Link>

        <Link to={paginationGoTo.rightEnd}>
          <Button 
            className={styleBookMenu.PaginationButton}
            label={<FontAwesomeIcon icon={paginationButtons.rightEnd}/>}
          />
        </Link>
      </BrowserRouter>

    </div>
  );
};

export default BookPagination;