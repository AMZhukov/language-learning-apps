import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction } from '../../Redux/login/userAction';
import './Headers.css';
import '../Nav/Nav.scss';

const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => {
    return store.user.isAuth;
  });
  return (
    <header className="header">
      <nav className="nav container">
        <Link className="nav__logo" to="/">
          Будь (Ев)Гением
        </Link>
        <div className="nav__actions">
          {!isAuth && (
            <Link className="nav__action" to="/sign-in">
              Sign in
            </Link>
          )}
          {!isAuth && (
            <Link className="nav__action" to="/sign-up">
              Sign up
            </Link>
          )}
          {isAuth && (
            <button onClick={() => dispatch(logoutAction())} className="nav__action nav__button">
              Выйти
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export { Header };
