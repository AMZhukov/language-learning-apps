// eslint-disable-line
import bcryptjs from 'bcryptjs';
import { User } from '../../models/User.js';

export const registration = async (req, res) => {
  const { username, email, password } = req.body.registrationData;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json('На данную почту уже зарегистрирован аккаунт');
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const model = new User({ username, email, password: hashedPassword });
    await model.save();
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
  return res.status(201).json('Логин успешно создан');
};
