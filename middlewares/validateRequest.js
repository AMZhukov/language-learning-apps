// eslint-disable-line
export const validateRequest = (schema) => {
	return async (req, res, next) => {
		const body = req.body.registrationData;
		try {
			await schema.validate(body);
			return next();
		} catch (error) {
			return res.status(400).json(error.message);
		}
	};
};