import * as yup from "yup";

const validations = yup.object().shape({
	email: yup
		.string()
		.email("Entry valid email")
		.required("Email is required"),
	password: yup
		.string()
		.min(6, "Password must be at least 6 characters")
		.required("Password is required"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password")], "Passwords must match")
		.required("Password confirm is required"),
});

export default validations;
