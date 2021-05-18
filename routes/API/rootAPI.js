// eslint-disable-line
import { Router } from 'express';

import { registration } from './registration.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { schema } from '../../validation/registration.js';

import { login } from './login.js';

import { testQuestions } from './testQuestions.js';

export const rootAPI = Router();

rootAPI.post('/registration', validateRequest(schema), registration);

rootAPI.post('/sign-in', login);

rootAPI.get('/testQuestions', testQuestions);
