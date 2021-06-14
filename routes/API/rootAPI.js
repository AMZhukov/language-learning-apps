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
import { lesson } from './lesson.js';
import { editLesson } from './editLesson.js';
import { editLessonContent } from './editLessonContent.js';

export const rootAPI = Router();

rootAPI.post('/registration', validateRequest(schema), registration);

rootAPI.post('/sign-in', login);

rootAPI.get('/testQuestions', testQuestions);

rootAPI.post('/createTestQuestion', createTestQuestion);

rootAPI.get('/courseList', courseList);

rootAPI.post('/createLesson', createLesson);

rootAPI.put('/changeCourse', changeCourse);

rootAPI.delete('/deleteCourse/:id', deleteCourse);

rootAPI.get('/lesson/:id', lesson);

rootAPI.post('./lesson/:id', editLessonContent);

rootAPI.put('/editLesson', editLesson);
