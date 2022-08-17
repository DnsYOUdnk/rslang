import cl from './MainPage.module.css';

export const MainPage = ( ): JSX.Element => {
    return (
      <div className={cl.wrapper}>
        <div className={cl.header}>Header</div>
        <div className={cl.body}>Body</div>
        <div className={cl.footer}>Footer</div>
      </div>
    );
};
