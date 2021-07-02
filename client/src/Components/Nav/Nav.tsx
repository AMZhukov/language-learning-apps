import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useActions } from '../../hooks/useActions.hook';
import { useTypedSelector } from '../../hooks/useTypesSelector.hook';

import '../Nav/Nav.scss';

export const Nav: React.FC = () => {
  const { logoutAction } = useActions();
  const history = useHistory();
  const logoutHandler = async (): Promise<void> => {
    try {
      await logoutAction();
      history.push('/');
    } catch (error) {
      console.log(error.response.data);
    }
  };
  const isAuth = useTypedSelector((store) => {
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
            <button onClick={logoutHandler} className="nav__action nav__button">
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
        {isAuth && (
          <li className="nav__item">
            <Link className="nav__action" to="/getUsers">
              Получить юзеров
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
