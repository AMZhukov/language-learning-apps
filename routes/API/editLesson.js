// eslint-disable-line
import { Lesson } from '../../models/Lesson.js';

export const editLesson = async (req, res) => {
  try {
    const {
      headNumber, lessonNumber, name, description, linkToImage, _id,
    } = req.body.newLesson;

    await Lesson.findByIdAndUpdate(
      _id,
      {
        headNumber,
        lessonNumber,
        name,
        description,
        linkToImage,
      },
      { runValidators: true },
      // eslint-disable-next-line consistent-return
      (error) => {
        if (error) {
          return res.status(500).json(`${error}`);
        }
      },
    );

    return res.status(201).json('Урок успешно скорректирован');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
