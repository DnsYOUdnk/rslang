import { TeamPersonProps } from './TeamPerson.props';
import cl from './TeamPerson.module.css';
import cn from 'classnames';

<<<<<<< HEAD
export const TeamPerson = ({ title, img, link, children, className, ...props }: TeamPersonProps): JSX.Element => {
=======
export const TeamPerson = ({
  title,
  img,
  link,
  position,
  done,
  children,
  className,
  ...props
}: TeamPersonProps): JSX.Element => {
>>>>>>> develop
  return (
    <div
      {...props}
      className={cn(className, cl.person, {
        [cl.reverse]: position === 'reverse',
      })}
    >
      <img className={cl.img} src={img} alt='img' />
      <div className={cl.info}>
        <h3 className={cl.title}>
          <span>{title}</span>
          <a href={link}>
            <img src='/icons/github.svg' alt='github' className={cl.github} />
          </a>
        </h3>
        <div className={cl.label}>developer</div>
        <div className={cl.descr}>{children}</div>
        <div className={cl.label}>что сделал ?</div>
        <div className={cl.descr}>{done}</div>
      </div>
    </div>
  );
};
