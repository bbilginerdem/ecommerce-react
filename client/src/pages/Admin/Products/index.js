import { useMemo } from "react";

import { useQuery, useMutation } from "react-query";
import { fetchProductList, deleteProduct } from "../../../api";

import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";
import { Table, Popconfirm } from "antd";

function Products() {
	const { isLoading, data, isError, error } = useQuery(
		"admin:products",
		fetchProductList
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>Error: {error.message}</div>;
	}

	const deleteMutation = useMutation(deleteProduct, {
		refetchQueries: ["admin:products"],
	});

	const columns = useMemo(() => {
		return [
			{
				title: "Title",
				dataIndex: "title",
				key: "title",
			},
			{
				title: "Price",
				dataIndex: "price",
				key: "price",
			},
			{
				title: "Created At",
				dataIndex: "createdAt",
				key: "createdAt",
			},
			{
				title: "Action",
				key: "action",
				render: (text, record) => (
					<>
						<Link to={`/admin/products/${record._id}`}>Edit</Link>
						<Popconfirm
							title="Are you sure?"
							onConfirm={() => {
								deleteMutation.mutate(record._id, {
									onSuccess: () => {
										console.log("success");
									},
								});
							}}
							onCancel={() => console.log("cancelled")}
							okText="Yes"
							cancelText="No"
							placement="left"
						>
							<a href="/#" style={{ marginLeft: 10 }}>
								Delete
							</a>
						</Popconfirm>
					</>
				),
			},
		];
	}, []);

	return (
		<div>
			<Text fontSize="2xl" p="5">
				Products
			</Text>

			<Table dataSource={data} columns={columns} rowKey="_id" />
		</div>
	);
}

export default Products;
