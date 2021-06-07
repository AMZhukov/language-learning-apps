// eslint-disable-line
import { Lesson } from '../../models/Lesson.js';

// const list = [
//   {
//     name: 'Алфавит',
//     description: 'Изучение алфавита и произношение алфавита',
//     imagePreview: 'https://i.pinimg.com/originals/61/1e/e3/611ee3f302d04d3d1d2b7057f1fb2033.jpg',
//     lessonIsPassed: false,
//     isAvailable: true,
//   },
// ];

export const courseList = async (req, res) => {
  const lessons = await Lesson.find();
  res.status(200).json(lessons);
};
