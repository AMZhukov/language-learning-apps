// eslint-disable-line
import { Lesson } from '../../models/Lesson.js';

export const courseList = async (req, res) => {
  const lessons = await Lesson.find();
  const lessonsWithoutStartTest = lessons.filter((lesson) => {
    // eslint-disable-next-line no-underscore-dangle
    return lesson._id !== 'startTest';
  });
  res.status(200).json(lessonsWithoutStartTest);
};
