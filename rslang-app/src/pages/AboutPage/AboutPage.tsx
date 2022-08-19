import { Route, Routes } from 'react-router-dom';
import { Body } from '../../components/Body/Body';
import { Footer } from '../../components/Footer/Footer';
import { AboutPageProps } from './AboutPage.props';
import cl from './AboutPage.module.css';
import cn from 'classnames';

export const AboutPage = ({ className, ...props }: AboutPageProps): JSX.Element => {
  return (
    <main className={cn(className, cl.main)}>
      
      
    </main>
  );
};
