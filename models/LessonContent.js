// eslint-disable-line
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  _id: { type: String, require: true },
  content: { type: Array, require: true },
});

export const LessonContent = mongoose.model('Lesson', schema);
