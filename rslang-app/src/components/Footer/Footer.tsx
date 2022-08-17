import { FooterProps } from './Footer.props';
import cl from './Footer.module.css';
import cn from 'classnames';

export const Footer = ({ className, ...props }: FooterProps): JSX.Element => {
    return (
      <footer {...props} className={cn(className, cl.footer)}>
          <div className={cl.footer__wrap}>
            <a href='https://rs.school/js-stage0/' className={cl.footer__rss}>
              Rolling Scopes School
            </a>
            
            <div className={cl.footer__box}>
              <div>©</div>
              <div>2022</div>
              <a href='https://github.com/ValentinBrest'>Valentin</a>
              <a href='#'>Denis</a>
              <a href='#'>Dmitry</a>
            </div>
          </div>
      </footer>
    );
};