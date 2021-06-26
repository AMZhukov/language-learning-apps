// eslint-disable-line
import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  refreshToken: { type: String, required: true },
});

export const RefreshToken = mongoose.model('RefreshToken', schema);
