import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Test from './Components/Test/Test.jsx';
import { Main } from './Components/MainPage/Main';
import { Header } from './Components/Header/Header';
import { Registration } from './Components/Registration/Registration';
import { FinishTest } from './Components/Test/FinishTest';
import { SignIn } from './Components/SignIn/SignIn';
import './App.css';
import './Components/basicStyle.css';
import { useSelector } from 'react-redux';
import { useAuth } from './hooks/useAuth.hook';
import { CreateCourse } from './Components/CreateCourse/CreateCourse';
import { ListOfCourses } from './Components/CourseList/ListOfCourses';
import { CreateLesson } from './Components/CreateLesson/CreateLesson';

function App() {
  useAuth();
  const isAuth = useSelector((store) => {
    return store.user.isAuth;
  });
  if (!isAuth) {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/test">
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
  } else {
    return (
      <div className="App">
        <Header />
        <Switch>
          <Route exact path="/">
            <Main />
            <ListOfCourses />
          </Route>
          <Route path="/test">
            <Test />
          </Route>
          <Route path="/finishTest">
            <FinishTest />
          </Route>
          <Route path="/createCourse">
            <CreateCourse />
          </Route>
          <Route exact path="/createLesson">
            <CreateLesson />
          </Route>
        </Switch>
      </div>
    );
  }
}
export default App;
