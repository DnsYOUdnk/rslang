import React, { ReactElement } from 'react';
import cl from './NavBtn.module.css';
import cn from 'classnames';

type ButtonProps = {
  label: ReactElement | string;
  className: string;
}

const NavBtn = ({label, className, ...props}: ButtonProps) => {
  return(
    <button 
      {...props}
      className={cn(cl.NavBtn, className)}>
      {label}
    </button>
  )
}

export default NavBtn;