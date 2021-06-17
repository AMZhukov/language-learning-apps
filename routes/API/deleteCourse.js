/* eslint-disable */
/* eslint-enable */

import { Lesson } from '../../models/Lesson.js';

export const deleteCourse = async (req, res) => {
  const { _id } = req.params;
  try {
    await Lesson.deleteOne({ _id });
    return res.status(203).json('Deleted');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
