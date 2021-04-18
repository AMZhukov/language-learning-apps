import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Test from './Components/Test/Test';
import { Main } from './Components/MainPage/Main';
import { Header } from './Components/Header/Header';
import './App.css';
import './Components/basicStyle.css';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
