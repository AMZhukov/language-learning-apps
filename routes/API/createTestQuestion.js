// eslint-disable-line
import { TestQuestions } from '../../models/TestQuestion.js';

export const createTestQuestion = async (req, res) => {
  const { question, variantsCorrectAnswers } = req.body;
  const model = new TestQuestions({ question, variantsCorrectAnswers });
  try {
    await model.save();
    return res.status(200).json('All right');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
