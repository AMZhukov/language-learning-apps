// eslint-disable-line
import { LessonContent } from '../../models/LessonContent.js';
import { Lesson } from '../../models/Lesson.js';

export const createLessonContent = async (req, res) => {
  const { _id } = req.params;
  const { content } = req.body;
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

    const newContent = new LessonContent({ _id, content });
    // eslint-disable-next-line consistent-return
    await newContent.save((error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    return res.status(201).json('Контент урока успешно создан');
  } catch (error) {
    res.status(500).json(`Ошибка ID: ${_id}`);
  }
  return true;
};
