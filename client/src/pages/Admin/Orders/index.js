import React from "react";

import {
	Table,
	Thead,
	Tbody,
	Tr,
	Th,
	Td,
	TableCaption,
	Text,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { fetchOrders } from "../../../api";

function Orders() {
	// getting the data that is stored in the localStorage
	const { isLoading, isError, data, error } = useQuery(
		"admin: orders",
		fetchOrders
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>{error.message}</div>;
	}

	return (
		<div>
			<Text fontSize="2xl" p={5}>
				Orders
			</Text>
			<Table variant="simple">
				<TableCaption>Ordered Products</TableCaption>
				<Thead>
					<Tr>
						<Th>User</Th>
						<Th>Address</Th>
						<Th>Items</Th>
					</Tr>
				</Thead>
				<Tbody>
					{data.map((item) => (
						<Tr key={item._id}>
							<Td>{item.user.email}</Td>
							<Td>{item.adress}</Td>
							<Td>{item.items.length}</Td>
						</Tr>
					))}
				</Tbody>
			</Table>
		</div>
	);
}

export default Orders;
