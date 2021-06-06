// eslint-disable-line
import bcryptjs from 'bcryptjs';
import { User } from '../../models/User.js';
import { createToken } from './createToken.js';

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Пользователь с данной почтой не найден' });
    }
    const isMatch = await bcryptjs.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Пароль не соответствует учётной записи' });
    }
    const token = createToken(user.id);
    return res.status(200).json({ token, userId: user.id, message: 'Успешный вход с систему' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
