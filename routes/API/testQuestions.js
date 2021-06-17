// eslint-disable-line
import { TestQuestions } from '../../models/TestQuestion.js';
import { Lesson } from '../../models/Lesson.js';

export const testQuestions = async (req, res) => {
  const { _id } = req.params;
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

    const questions = await TestQuestions.findOne({ _id });
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json(`${error}`);
  }
};
