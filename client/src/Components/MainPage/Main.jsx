import React from 'react';
import { Link } from 'react-router-dom';

import './Main.scss';
import { Header } from '../Header/Header';

const Main = () => {
  return (
    <>
      <Header />
      <main className="main">
        <div className="main__container container">
          <div className="main__content">Изучайте язык вместе с нами!</div>
          <Link
            className="main__checkTest"
            to="/test/startTest"
          >
            Проверь свои знания
          </Link>
        </div>
      </main>
    </>
  );
};

export { Main };
