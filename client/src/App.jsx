import React from 'react';

import { Route, Switch } from 'react-router-dom';
import Test from './Components/Test/Test.tsx';
import { Main } from './Components/MainPage/Main';
import { Registration } from './Components/SignIn&SignUp/Registration';
import { FinishTest } from './Components/Test/FinishTest';
import { SignIn } from './Components/SignIn&SignUp/SignIn';
import './App.css';
import './Components/basicStyle.css';
import { useAuth } from './hooks/useAuth.hook.tsx';
import { CreateTest } from './Components/CreateTest/CreateTest';
import { ListOfCourses } from './Components/CourseList/ListOfCourses';
import { CreateLesson } from './Components/CreateLesson/CreateLesson';
import { CreateLessonContent } from './Components/Lesson/CreateLessonContent';
import { Lesson } from './Components/Lesson/Lesson';
import { useTypedSelector } from './hooks/useTypesSelector.hook';
import { GetUsers } from './Components/GetUsers/GetUsers';

function App() {
  useAuth();
  const { isAuth } = useTypedSelector((store) => {
    return store.user;
  });
  return (
    <div className="App">
      <Switch>
        <Route exact path="/test" component={Test} />
        {!isAuth && <Route path="/sign-up" component={Registration} />}
        {!isAuth && <Route path="/sign-in" component={SignIn} />}
        <Route path="/finishTest" component={FinishTest} />
        {isAuth && <Route path="/lesson/:_id" component={Lesson} />}
        {isAuth && <Route path="/createTest/:_id" component={CreateTest} />}
        {isAuth && <Route exact path="/createLesson" component={CreateLesson} />}
        {isAuth && <Route path="/editLesson/:_id" component={CreateLesson} />}
        {isAuth && <Route path="/createLessonContent/:_id" component={CreateLessonContent} />}
        {isAuth && <Route path="/test/:_id" component={Test} />}
        <Route path="/getUsers">
          <GetUsers />
        </Route>
        <Route path="/">
          <Main />
          <ListOfCourses />
        </Route>
      </Switch>
    </div>
  );
}
export default App;
