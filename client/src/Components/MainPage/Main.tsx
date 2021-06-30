import React from 'react';
import { Link } from 'react-router-dom';

import { Header } from '../Header/Header';
import './Main.scss';

const Main: React.FC = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container container">
          <div className="main__content">Изучайте язык вместе с нами!</div>
          <Link className="main__checkTest" to="/test/startTest">
            Проверь свои знания
          </Link>
          <Link to="/getUsers">Получить юзеров</Link>
        </div>
      </main>
    </>
  );
};

export { Main };
