/* eslint-disable */
/* eslint-enable */

import { Lesson } from '../../models/Lesson.js';

export const deleteCourse = async (req, res) => {
  const { id } = req.params;
  try {
    await Lesson.deleteOne({ id });
    return res.status(203).json('Deleted');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
