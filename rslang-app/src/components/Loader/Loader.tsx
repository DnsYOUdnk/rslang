import cl from './Loader.module.css';
import { LoaderProps } from './Loader.props';

export const Loader = ({ className, ...props }: LoaderProps): JSX.Element => {
  return (
    <div className={cl.wrap}>
      <div className={cl.loading}></div>
    </div>
  );
};
