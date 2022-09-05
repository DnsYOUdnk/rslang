import { DescriptionProps } from './Description.props';
import cl from './Description.module.css';
import cn from 'classnames';

export const Description = ({ title, img, children, className, ...props }: DescriptionProps): JSX.Element => {
  return (
    <div {...props} className={cn(className, cl.wrapper)}>
      <img className={cl.img} src={img} alt='img' />
      <div className={cl.info}>
        <div className={cl.title}>{title}</div>
        <div className={cl.descr}>{children}</div>
      </div>
    </div>
  );
};
