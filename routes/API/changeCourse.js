/* eslint-disable */
/* eslint-enable */

import { Lesson } from '../../models/Lesson.js';

export const changeCourse = async (req, res) => {
  const { _id } = req.body;
  try {
    await Lesson.findOne({ _id });
    return res.status(203).json('Changed');
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
