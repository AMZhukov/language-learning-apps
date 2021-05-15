// eslint-disable-line
import { Router } from 'express';

import { registration } from './registration.js';
import { testQuestions } from './testQuestions.js';
import { validateRequest } from '../../middlewares/validateRequest.js';
import { schema } from '../../validation/registration.js';

export const rootAPI = Router();

rootAPI.post('/registration', validateRequest(schema), registration);

rootAPI.get('/testQuestions', testQuestions);
