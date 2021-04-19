import React from 'react';
import './Headers.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <a className="header__logo" href="/">
          Будь (Ев)Гением
        </a>
        <div className="header__actions">
          <a className="header__action" href="/">
            Sign in
          </a>
          <a className="header__action" href="/">
            Sign up
          </a>
        </div>
      </div>
    </header>
  );
};
export { Header };
