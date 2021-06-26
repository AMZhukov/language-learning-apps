// eslint-disable-line
import { Router } from 'express';

import { registration } from './registration.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { schema } from '../../validation/registration.js';

import { login } from './login.js';

import { testQuestions } from './testQuestions.js';
import { createTestQuestion } from './createTestQuestion.js';
import { courseList } from './courseList.js';
import { createLesson } from './createLesson.js';
import { changeCourse } from './changeCourse.js';
import { deleteCourse } from './deleteCourse.js';
import { contentLesson } from './contentLesson.js';
import { editLesson } from './editLesson.js';
import { createLessonContent } from './createLessonContent.js';
import { editLessonContent } from './editLessonContent.js';
import { lesson } from './lesson.js';
import { editTestQuestion } from './editTestQuestion.js';
import { userController } from '../../controllers/User-controller.js';
import { authMiddleware } from '../../middlewares/auth-middleware.js';

export const rootAPI = Router();

rootAPI.post('/registration', validateRequest(schema), registration);

rootAPI.post('/registrationNew', validateRequest(schema), userController.register);

rootAPI.get('/activate/:link', userController.activate);

rootAPI.get('/refresh', userController.refresh);

rootAPI.get('/getUsers', authMiddleware(), userController.getUsers);

rootAPI.post('/sign-in', login);

rootAPI.post('/sign-inNew', userController.login);

rootAPI.get('/logout', userController.logout);

rootAPI.get('/testQuestions/:_id', testQuestions);

rootAPI.post('/createTestQuestion/:_id', createTestQuestion);

rootAPI.put('/createTestQuestion/:_id', editTestQuestion);

rootAPI.get('/lesson/:_id', lesson);

rootAPI.post('/createLesson', createLesson);

rootAPI.put('/changeCourse', changeCourse);

rootAPI.put('/editLesson', editLesson);

rootAPI.delete('/deleteCourse/:_id', deleteCourse);

rootAPI.get('/courseList', courseList);

rootAPI.get('/lessonContent/:_id', contentLesson);

rootAPI.post('/lessonContent/:_id', createLessonContent);

rootAPI.put('/lessonContent/:_id', editLessonContent);
