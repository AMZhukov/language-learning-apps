// eslint-disable-line
import { TestQuestions } from '../../models/TestQuestion.js';
import { Lesson } from '../../models/Lesson.js';

export const createTestQuestion = async (req, res) => {
  const { _id } = req.params;
  const { questions } = req.body;
  try {
    // eslint-disable-next-line consistent-return
    const lesson = await Lesson.findOne({ _id }, (error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    if (!lesson) {
      return res.status(404).json('Данный урок в базе не найден');
    }
    const model = new TestQuestions({ questions, _id });
    // eslint-disable-next-line consistent-return
    await model.save((error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    return res.status(200).json('All right');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
