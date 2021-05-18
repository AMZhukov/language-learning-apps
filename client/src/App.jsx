import React, { useEffect } from 'react';

import { Route, Switch } from 'react-router-dom';
import Test from './Components/Test/Test.jsx';
import { Main } from './Components/MainPage/Main';
import { Header } from './Components/Header/Header';
import { Registration } from './Components/Registration/Registration';
import { FinishTest } from './Components/Test/FinishTest';
import { SignIn } from './Components/SignIn/SignIn';
import './App.css';
import './Components/basicStyle.css';
import { useDispatch, useSelector } from 'react-redux';
import { setUserAction } from './Redux/login/userAction';
import { useAuth } from './hooks/useAuth.hook';

function App() {
  useAuth();
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/sign-up">
          <Registration />
        </Route>
        <Route path="/sign-in">
          <SignIn />
        </Route>
        <Route path="/finishTest">
          <FinishTest />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
