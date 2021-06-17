//eslint-disable-line
import { Lesson } from '../../models/Lesson.js';

export const lesson = async (req, res) => {
  const { _id } = req.params;
  try {
    // eslint-disable-next-line consistent-return
    const lessonHead = await Lesson.findOne({ _id }, (error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });

    if (!lessonHead) {
      return res.status(404).json('Данный урок в базе не найден');
    }
    return res.status(200).json(lessonHead);
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
