import * as yup from 'yup';

yup.setLocale({
	mixed: {
		notType: 'Введите данные числового типа',
		required: 'Поле обязательно к заполнению',
	},
	string: {
		/* eslint-disable no-template-curly-in-string */
		min: 'Минимальное количество символов ${min}',
		max: 'Максимальное количество символов ${max}',
		/* eslint-enable no-template-curly-in-string */
	},
});

const schema = yup.object().shape({
	tag: yup.string().max(10),
	content: yup.string().max(400).min(2),
});

export { schema };
