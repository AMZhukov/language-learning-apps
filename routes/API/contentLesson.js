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
    let currentLesson = await LessonContent.findOne({ _id }, (error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    if (!currentLesson) {
      currentLesson = {};
      currentLesson.content = [];
    }
    currentLesson.content.unshift({ tag: 'h1', content: lesson.name });
    return res.status(200).json(currentLesson);
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
