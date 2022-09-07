import React from 'react';
import cl from './TextBookNav.module.css';

type Props = {
  text?: string;
  link: string;
  children?: JSX.Element;
  isActive?: boolean;
};

export function TextBookNavItem({ text, link, children, isActive }: Props) {
  return (
    <li className={`bookNav__listItem ${isActive ? 'bookNav__listItem_active' : ''}`}>
      <a className="bookNav__link" href={`#/textbook/${link}/1`}>
        <span className="bookNav__levelCard levelCard btn2 book">
          <span className="levelCard__name">{text}</span>
          {children}
        </span>
      </a>
    </li>
  );
}

TextBookNavItem.defaultProps = {
  text: '',
  children: '',
};
