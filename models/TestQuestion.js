// eslint-disable-line
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: { type: String, require: true },
  questions: [
    {
      question: { type: String, require: true },
      variantsCorrectAnswers: { type: Array, require: true, of: String },
    },
  ],
});

export const TestQuestions = mongoose.model('TestQuestions', schema);
