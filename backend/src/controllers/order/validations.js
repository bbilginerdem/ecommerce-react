import Joi from "joi";

// joi used to validate data
const OrderSchema = Joi.object({
	address: Joi.string().required(),
	items: Joi.array().items(Joi.string()).required(),
});

export default OrderSchema;
