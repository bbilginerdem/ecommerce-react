import React from "react";

import { useParams } from "react-router-dom";
import { fetchProduct, updateProduct } from "../../../api";
import { useQuery } from "react-query";
import {
	Box,
	Button,
	FormControl,
	FormLabel,
	Input,
	Text,
	Textarea,
} from "@chakra-ui/react";
import { FieldArray, Formik } from "formik";
import validationSchema from "./validations";

function ProductsDetail() {
	const { product_id } = useParams();

	const { isLoading, isError, data, error } = useQuery(
		["admin:product", product_id],
		() => fetchProduct(product_id)
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const handleSubmit = async (values, bag) => {
		console.log("submit");
	};

	return (
		<div>
			<Text fontSize="2xl">Edit</Text>
			<Formik
				initialValues={{
					title: data.title,
					description: data.description,
					price: data.price,
					photos: data.photos,
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({
					values,
					handleChange,
					handleBlur,
					handleSubmit,
					errors,
					touched,
					isSubmitting,
				}) => (
					<>
						<Box>
							<Box my="5" textAlign="left">
								<form onSubmit={handleSubmit}>
									<FormControl>
										<FormLabel>Title</FormLabel>
										<Input
											name="title"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.title}
											disabled={isSubmitting}
											isInvalid={
												touched.title && errors.title
											}
										/>
										{touched.title && errors.title && (
											<Text color="red">
												{errors.title}
											</Text>
										)}
									</FormControl>
									<FormControl mt="4">
										<FormLabel>Price</FormLabel>
										<Input
											name="price"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.price}
											disabled={isSubmitting}
											isInvalid={
												touched.price && errors.price
											}
										/>
										{touched.price && errors.price && (
											<Text color="red">
												{errors.price}
											</Text>
										)}
									</FormControl>
									<FormControl mt="4">
										<FormLabel>Description</FormLabel>
										<Textarea
											name="description"
											onChange={handleChange}
											onBlur={handleBlur}
											value={values.description}
											disabled={isSubmitting}
											isInvalid={
												touched.description &&
												errors.description
											}
										/>
										{touched.description &&
											errors.description && (
												<Text color="red">
													{errors.description}
												</Text>
											)}
									</FormControl>
									<FormControl mt="4">
										<FormLabel>Photos</FormLabel>
										<FieldArray
											name="photos"
											render={(arrayHelpers) => (
												<div>
													{values.photos &&
														values.photos.map(
															(photo, index) => (
																<div
																	key={index}
																>
																	<Input
																		name={`photos.${index}`}
																		value={
																			photo
																		}
																		disabled={
																			isSubmitting
																		}
																		onChange={
																			handleChange
																		}
																		width="3xl"
																	/>
																	<Button
																		ml="4"
																		type="button"
																		colorScheme="red"
																		onClick={() =>
																			arrayHelpers.remove(
																				index
																			)
																		}
																	>
																		Remove
																	</Button>
																</div>
															)
														)}
													<Button
														mt="5"
														onClick={() =>
															arrayHelpers.push(
																""
															)
														}
													>
														Add a photo
													</Button>
												</div>
											)}
										/>
									</FormControl>
									<Button
										mt={4}
										width="full"
										type="submit"
										isLoading={isSubmitting}
									>
										Update
									</Button>
								</form>
							</Box>
						</Box>
					</>
				)}
			</Formik>
		</div>
	);
}

export default ProductsDetail;
