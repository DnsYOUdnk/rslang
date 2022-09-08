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

        <div>2022</div>
        <div className={cl.footer__box}>
          <a href='https://github.com/ValentinBrest'>Valentin</a>
          <a href='https://github.com/DnsYOUdnk'>Denis</a>
          <a href='https://github.com/KuzmakD'>Dmitry</a>
        </div>
      </div>
    </footer>
  );
};
