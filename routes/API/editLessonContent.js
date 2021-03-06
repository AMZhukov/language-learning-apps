// eslint-disable-line
import { Lesson } from '../../models/Lesson.js';
import { LessonContent } from '../../models/LessonContent.js';

// eslint-disable-next-line consistent-return
export const editLessonContent = async (req, res) => {
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

    // eslint-disable-next-line consistent-return
    await LessonContent.findByIdAndUpdate(_id, { content }, { runValidators: true }, (error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });

    return res.status(201).json('Контент урока успешно скорректирован');
  } catch (error) {
    res.status(500).json(`Ошибка ID: ${_id}`);
  }
};
