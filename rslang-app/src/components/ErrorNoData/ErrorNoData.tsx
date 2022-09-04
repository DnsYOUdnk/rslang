import cn from 'classnames';
import cl from './ErrorNoData.module.css';
import Lottie from 'lottie-react';
import { ErrorNoDataProps } from './ErrorNoData.props';
import errorNoData from './../../assets/json-animation/error_no_data-1.json';

export const ErrorNoData = ({ className }: ErrorNoDataProps): JSX.Element => {
  return (
    <Lottie className={cn(className, cl.error_nodata)} animationData={errorNoData} loop={true} />
  );
};
