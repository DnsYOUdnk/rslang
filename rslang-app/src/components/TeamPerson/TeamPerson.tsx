import { TeamPersonProps } from './TeamPerson.props';
import cl from './TeamPerson.module.css';
import cn from 'classnames';

export const TeamPerson = ({ title, img, link, children, className, ...props }: TeamPersonProps): JSX.Element => {
  return (
    <a href={link} {...props} className={cn(className, cl.wrapper)}>
      <h3 className={cl.title}>{title}</h3>
      <img className={cl.img} src={img} alt='img' />

      <div className={cl.descr}>{children}</div>
    </a>
  );
};
