import React from 'react';
import { NavLink } from 'react-router-dom';

import './Main.scss';

const Main = () => {
  return (
    <main className="main">
      <div className="main__container container">
        <div className="main__content">Изучайте язык вместе с нами!</div>
        <NavLink
          className="main__checkTest"
          to="/test"
          activeStyle={{
            color: 'blue',
          }}
        >
          Проверь свои знания
        </NavLink>
      </div>
    </main>
  );
};

export { Main };
