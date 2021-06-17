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

export const rootAPI = Router();

rootAPI.post('/registration', validateRequest(schema), registration);

rootAPI.post('/sign-in', login);

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
