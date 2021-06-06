// eslint-disable-line
import bcryptjs from 'bcryptjs';
import { User } from '../../models/User.js';
import { createToken } from './createToken.js';

export const registration = async (req, res) => {
  const { username, email, password } = req.body.registrationData;
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json('На данную почту уже зарегистрирован аккаунт');
    }
    const hashedPassword = await bcryptjs.hash(password, 12);
    const user = new User({ username, email, password: hashedPassword });
    // eslint-disable-next-line consistent-return
    await user.save((error) => {
      if (error) {
        return res.status(500).json(`${error}`);
      }
    });
    const token = createToken(user.id);
    return res
      .status(200)
      .json({ token, userId: user.id, message: 'Логин успешно создан. Успешный вход с систему' });
  } catch (error) {
    return res.status(501).json(`${error}`);
  }
};
