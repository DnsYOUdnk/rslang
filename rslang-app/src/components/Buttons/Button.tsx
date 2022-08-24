import React, { ReactElement } from 'react';
import styleButton from './Button.module.css';
import cn from 'classnames';

type ButtonProps = {
  label: ReactElement | string;
  className: string;
}

const Button = ({label, className, ...props}: ButtonProps) => {
  return(
    <button 
      {...props}
      className={cn(styleButton.Button, className)}>
      {label}
    </button>
  )
}

export default Button;