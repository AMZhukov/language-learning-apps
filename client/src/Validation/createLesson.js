import * as yup from 'yup';

yup.setLocale({
  mixed: {
    notType: 'Введите данные числового типа',
    required: 'Поле обязательно к заполнению'
  },
  string: {
    /* eslint-disable no-template-curly-in-string */
    min: 'Минимальное количество символов ${min}',
    max: 'Максимальное количество символов ${max}',
    /* eslint-enable no-template-curly-in-string */
  },
});

const schema = yup.object().shape({
  headNumber: yup.number().min(0).max(99).nullable(),
  lessonNumber: yup.number().required().max(99).nullable(),
  name: yup.string().required().min(4).max(50),
  description: yup.string().required().max(200),
  linkToImage: yup.string().max(100),
});

export { schema };
