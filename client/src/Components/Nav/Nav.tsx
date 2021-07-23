import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { useActions } from '../../hooks/useActions.hook';
import { useTypedSelector } from '../../hooks/useTypesSelector.hook';

import '../Nav/Nav.scss';

export const Nav: React.FC = () => {
  let [isVisible, setIsVisible] = useState(false);
  const { logoutAction } = useActions();
  const history = useHistory();

  const changeVisibleClassName = () => {
    return setIsVisible((prev) => {
      return !prev;
    });
  };

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
      <button className="nav__button-view-menu" onClick={changeVisibleClassName}>
        <div className={'nav__button-icon ' + (isVisible && 'nav__button-icon_rotate')} />
        <div className={'nav__button-icon ' + (isVisible && 'nav__button-icon_invisible')} />
        <div className={'nav__button-icon ' + (isVisible && 'nav__button-icon_invisible')} />
        <div className={'nav__button-icon ' + (isVisible && 'nav__button-icon_rotate-right')} />
      </button>
      <ul className={'nav__menu ' + (isVisible && 'nav_view-menu')}>
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
