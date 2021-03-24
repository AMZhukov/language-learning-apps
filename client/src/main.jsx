import React from "react";

import "./main.css";
const Header = () => {
  return (
    <header className="header">
      <div className="logo">Будь (Ев)Гением</div>
      <div className="actions">
        <a className="action" href="/">Sign in</a>
        <a className="action" href="/">Sign up</a>
      </div>
    </header>
  );
};

const Main = () => {
  return (
    <main className="main">
      <div className="mainContent">Изучайте язык вместе с нами!</div>
      <button className="checkTest">Проверь свои знания</button>
    </main>
  );
};

export { Header, Main };
