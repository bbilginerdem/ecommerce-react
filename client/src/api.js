import axios from "axios";

axios.interceptors.request.use(
	function (config) {
		const { origin } = new URL(config.url);

		const allowedOrigins = [process.env.REACT_APP_BASE_END_POINT];
		const token = localStorage.getItem("access-token");

		if (allowedOrigins.includes(origin)) {
			config.headers.authorization = token;
		}

		return config;
	},
	function (error) {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	function (response) {
		return response;
	},
	function (error) {
		return Promise.reject(error);
	}
);

export const fetchProductList = async ({ pageParam = 0 }) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_END_POINT}/product?page=${pageParam}`
	);

	return data;
};

export const fetchProduct = async (id) => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_END_POINT}/product/${id}`
	);

	return data;
};

export const fetchRegister = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_END_POINT}/auth/register`,
		input
	);

	return data;
};

export const fetchLogin = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_END_POINT}/auth/login`,
		input
	);

	return data;
};

export const fetchMe = async () => {
	const { data } = await axios.get(
		`${process.env.REACT_APP_BASE_END_POINT}/auth/me`
	);

	return data;
};

export const fetchLogout = async () => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_END_POINT}/auth/logout`,
		{ refresh_token: localStorage.getItem("refresh-token") }
	);

	return data;
};

export const postOrder = async (input) => {
	const { data } = await axios.post(
		`${process.env.REACT_APP_BASE_END_POINT}/order`,
		input
	);

	return data;
};
