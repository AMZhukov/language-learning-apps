import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { logoutAction } from '../../Redux/login/userAction';
import '../Nav/Nav.scss';

export const Nav = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector((store) => {
    return store.user.isAuth;
  });
  return (
    <nav className="nav">
      <ul className="nav__menu">
        {!isAuth && (
          <li className="nav__item">
            <Link className="nav__action" to="/sign-in">
              Sign in
            </Link>
          </li>
        )}
        {!isAuth && (
	        <li className="nav__item">
            <Link className="nav__action" to="/sign-up">
              Sign up
            </Link>
          </li>
        )}
        {isAuth && (
	        <li className="nav__item">
            <button onClick={() => dispatch(logoutAction())} className="nav__action nav__button">
              Выйти
            </button>
          </li>
        )}
        {isAuth && (
	        <li className="nav__item">
            <Link className="nav__action" to="/createLesson">
              Create Lesson
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
