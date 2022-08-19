import Joi from "joi";

// joi used to validate data
const ProductSchema = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().min(3),
	price: Joi.string().required(),
	photos: Joi.string(),
});

export default ProductSchema;
