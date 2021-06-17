// eslint-disable-line
import { LessonContent } from '../../models/LessonContent.js';
import { Lesson } from '../../models/Lesson.js';

export const contentLesson = async (req, res) => {
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
    // eslint-disable-next-line consistent-return
    const currentLesson = await LessonContent.findOne({ _id }, (error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });

    return res.status(200).json(currentLesson);
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
