import { Schema } from 'mongoose';
import { Shortid } from 'shortid';

export const User = new Schema({
  _id: { type: String, default: Shortid.generate, unique: true },
  email: { type: String, require: true, unique: true },
  firstName: { type: String, require: true },
  lastName: { type: String, require: true },
  dateOfBirth: { type: Date },
  registrationDate: { type: Date, default: new Date() },
  phoneNumber: { type: Number },
});
