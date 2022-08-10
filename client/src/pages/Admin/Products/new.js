import React from "react";

import { postProduct } from "../../../api";
import { useMutation, useQueryClient } from "react-query";
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
import { message } from "antd";

function NewProduct() {
	const queryClient = useQueryClient();
	const newProductMutation = useMutation(postProduct, {
		onSuccess: () => queryClient.invalidateQueries("admin:products"),
	});

	const handleSubmit = async (values, bag) => {
		message.loading({ content: "Loading...", key: "new_product" });

		const newValues = {
			...values,
			photos: JSON.stringify(values.photos),
		};

		newProductMutation.mutate(newValues, {
			onSuccess: () => {
				console.log("success");

				message.success({
					content: "The product successfully updated",
					key: "new_product",
					duration: 2,
				});
			},
		});

		console.log(values);
	};

	return (
		<div>
			<Text fontSize="2xl">Add New Product</Text>
			<Formik
				initialValues={{
					title: "Test",
					description: "Lorem",
					price: "100",
					photos: [],
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
										Save
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

export default NewProduct;
