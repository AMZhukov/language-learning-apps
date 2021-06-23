// eslint-disable-line
import { Lesson } from '../../models/Lesson.js';

export const createLesson = async (req, res) => {
  try {
    const {
      headNumber, lessonNumber, name, description, linkToImage,
    } = req.body.newLesson;
    const newLesson = new Lesson({
      headNumber,
      lessonNumber,
      name,
      description,
      linkToImage,
    });
    // eslint-disable-next-line consistent-return
    await newLesson.save((error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    return res.status(201).json({ message: 'Урок успешно создан', newId: newLesson.id });
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
