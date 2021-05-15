// eslint-disable-line
import * as yup from 'yup';

yup.setLocale({
  string: {
    /* eslint-disable no-template-curly-in-string */
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}',
    /* eslint-enable no-template-curly-in-string */
  },
});

export const schema = yup.object({
  // eslint-disable-next-line no-template-curly-in-string
  username: yup.string().required().max(12),
  email: yup.string().email().required().max(30),
  password: yup.string().min(4).max(15).required(),
});
