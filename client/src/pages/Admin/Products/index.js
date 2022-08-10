import { useMemo } from "react";

import { useQuery, useMutation, useQueryClient } from "react-query"; //query- veri çekerken, mutation- ekleme sime yaparken
import { fetchProductList, deleteProduct } from "../../../api";
import { Text, Button, Flex } from "@chakra-ui/react";
import { Table, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";

function Products() {
	const queryClient = useQueryClient();

	const { isLoading, isError, data, error } = useQuery(
		"admin: products",
		fetchProductList
	);

	const deleteMutation = useMutation(deleteProduct, {
		onSuccess: () => queryClient.invalidateQueries("admin: products"),
	});

	const columns = useMemo(() => {
		return [
			{
				title: "Title",
				dataIndex: "title",
				key: "title",
			},
			{
				title: "Category",
				dataIndex: "category",
				key: "category",
			},
			{
				title: "Price ($)",
				dataIndex: "price",
				key: "price",
			},
			{
				title: "Action",
				dataIndex: "action",
				render: (text, record) => (
					<>
						<Link to={`/admin/products/${record._id}`}>Edit</Link>
						<Popconfirm
							title="Are you sure?"
							onConfirm={() => {
								deleteMutation.mutate(record._id, {
									onSuccess: () => {
										message.success({
											content:
												"The product successfully deleted",
											key: "product_update",
											duration: 2,
										});
									},
								});
							}}
							onCancel={() => {
								alert("cancelled");
							}}
							okText="Yes"
							cancelText="No"
							placement="left"
						>
							<button style={{ marginLeft: "10px" }}>
								Delete
							</button>
						</Popconfirm>
					</>
				),
			},
		];
	}, [deleteMutation]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error {error.message}</div>;
	}

	return (
		<div>
			<Flex justifyContent="space-between" alignItems="center">
				<Text fontSize="2xl" p="5">
					Products
				</Text>

				<Link to="/admin/products/new">
					<Button>New Product</Button>
				</Link>
			</Flex>

			<Table dataSource={data} columns={columns} rowKey="_id" />
		</div>
	);
}

export default Products;
