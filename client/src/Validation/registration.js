import * as yup from 'yup';

yup.setLocale({
  string: {
    /* eslint-disable no-template-curly-in-string */
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}',
    /* eslint-enable no-template-curly-in-string */
  },
});

const schema = yup.object().shape({
  username: yup.string().required().max(15),
  email: yup.string().email().required().max(30),
  password: yup.string().min(4).max(15).required(),
});

export { schema };
