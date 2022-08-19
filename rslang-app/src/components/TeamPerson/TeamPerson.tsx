import { TeamPersonProps } from './TeamPerson.props';
import cl from './TeamPerson.module.css';
import cn from 'classnames';

export const TeamPerson = ({
  title,
  img,
  link,
  children,
  className,
  ...props
}: TeamPersonProps): JSX.Element => {
  return (
    <div {...props} className={cn(className, cl.wrapper)}>
      <a href={link} className={cl.title}>
        {title}
      </a>
      <img className={cl.img} src={img} alt='img' />

      <div className={cl.descr}>{children}</div>
    </div>
  );
};