import React from 'react';
import './Headers.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="header">
      <nav className="nav container">
        <Link className="nav__logo" to="/">
          Будь (Ев)Гением
        </Link>
        <div className="nav__actions">
          <Link className="nav__action" to="/sign-in">
            Sign in
          </Link>
          <Link className="nav__action" to="/sign-up">
            Sign up
          </Link>
        </div>
      </nav>
    </header>
  );
};

export { Header };
