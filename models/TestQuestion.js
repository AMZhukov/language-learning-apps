/* eslint-disable */
import mongoose from 'mongoose';
/* eslint-enable */

import Shortid from 'shortid';

const schema = new mongoose.Schema({
  _id: { type: String, default: Shortid.generate },
  question: { type: String, require: true },
  variantsCorrectAnswers: { type: Array, of: String },
});

export const TestQuestions = mongoose.model('TestQuestions', schema);
