// eslint-disable-line

import { Lesson } from '../../models/Lesson.js';

export const lesson = async (req, res) => {
  const { id } = req.body;
  try {
    const currentLesson = await Lesson.findOne({ id });
    return res.status(200).json(currentLesson);
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
