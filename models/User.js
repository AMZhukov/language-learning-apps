/* eslint-disable */
import mongoose from 'mongoose';
/* eslint-enable */
import Shortid from 'shortid';

const schema = new mongoose.Schema({
  _id: { type: String, default: Shortid.generate },
  email: { type: String, require: true, unique: true },
  username: { type: String, require: true },
  password: { type: String, require: true},
  dateOfBirth: { type: Date },
  registrationDate: { type: Date, default: new Date() },
  phoneNumber: { type: Number },
});

export const User = mongoose.model('User', schema);
