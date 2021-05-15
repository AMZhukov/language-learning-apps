// eslint-disable-line
import { User } from '../../models/User.js';

export const registration = async (req, res) => {
  const { username, email, password } = req.body.registrationData;
  const model = new User({ username, email, password });
  try {
    const candidate = await User.findOne({ email });
    if (candidate) {
      return res.status(400).json('На данную почту уже зарегистрирован аккаунт');
    }
    await model.save();
  } catch (error) {
    console.log(error);
    return res.status(501).json(`${error}`);
  }
  return res.status(201).json('Login successful created');
};
