import React from 'react';
import { Link } from 'react-router-dom';

import { Nav } from '../Nav/Nav.jsx';
import './Headers.css';

const Header = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__logo-wrapper">
            <Link className="header__logo" to="/" />
          </div>
          <Nav />
        </div>
      </div>
    </header>
  );
};

export { Header };
