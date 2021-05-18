import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../logo.svg';

import './LogoLink.scss';

export const LogoLink = () => {
  return (
    <div className="LogoLink__logo-wrapper" role="banner">
      <Link to="/">
        <img src={logo} className="LogoLink__logo" alt="logo" />
      </Link>
    </div>
  );
};
