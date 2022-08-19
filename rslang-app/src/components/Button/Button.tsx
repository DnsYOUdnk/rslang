import cl from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({ children, className, ...props }: ButtonProps): JSX.Element => {
   return (
       <button
           className={cn(cl.button, className)}
		   {...props}
       >
           {children}
       </button>
   );
};
