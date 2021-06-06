/* eslint-disable */
import mongoose from 'mongoose';
/* eslint-enable */
import mongooseUrl from 'mongoose-type-url';
import Shortid from 'shortid';

const schema = new mongoose.Schema({
  _id: { type: String, default: Shortid.generate },
  headNumber: { type: Number, require: true },
  lessonNumber: { type: Number, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  linkToImage: { type: mongooseUrl },
});

export const Lesson = mongoose.model('Lesson', schema);
