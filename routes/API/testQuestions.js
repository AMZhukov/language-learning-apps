// eslint-disable-line
import { TestQuestions } from '../../models/TestQuestion.js';

export const testQuestions = async (req, res) => {
  const questions = await TestQuestions.find();
  return res.status(200).json(questions);
};
