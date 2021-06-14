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
import { useAuth } from './hooks/useAuth.hook.jsx';
import { CreateCourse } from './Components/CreateCourse/CreateCourse';
import { ListOfCourses } from './Components/CourseList/ListOfCourses';
import { CreateLesson } from './Components/CreateLesson/CreateLesson';
import { Lesson } from './Components/Lesson/Lesson';

function App() {
  useAuth();
  const isAuth = useSelector((store) => {
    return store.user.isAuth;
  });
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/test" component={Test} />
        {!isAuth && <Route path="/sign-up" component={Registration} />}
        {!isAuth && <Route path="/sign-in" component={SignIn} />}
        <Route path="/finishTest" component={FinishTest} />
        {isAuth && <Route exact path="/createCourse" component={CreateCourse} />}
        {isAuth && <Route exact path="/createLesson" component={CreateLesson} />}
        {isAuth && <Route path="/editLesson/:_id" component={CreateLesson} />}
        {isAuth && <Route path="/lesson/:_id" component={Lesson} />}
        <Route path="/">
          <Main />
          <ListOfCourses />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
