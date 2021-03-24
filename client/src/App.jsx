import logo from './logo.svg';
import './App.css';
import {Header, Main} from "./main";
import React from 'react';

function App() {
  console.log(1); //?
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

export default App;
