import React from "react";

import { Alert, Link, Image, Button, Box, Text } from "@chakra-ui/react";
import { useBasket } from "../../contexts/BasketContext";

function Basket() {
	const { items, removeFromBasket } = useBasket();

	const total = items.reduce((acc, item) => acc + item.price, 0);

	return (
		<Box p="5">
			{items.length < 1 && (
				<Alert status="warning">No Products In The Basket</Alert>
			)}
			{items.length > 0 && (
				<>
					<ul style={{ listStyleType: "decimal" }}>
						{items.map((item) => (
							<li key={item._id} style={{ marginBottom: 15 }}>
								<Link to={`/product/${item._id}`}>
									<Text fontSize="20">
										{item.title} - {item.price} $
									</Text>
									<Image
										htmlWidth="200"
										loading="lazy"
										src={item.photos[0]}
										alt="product"
									/>
								</Link>

								<Button
									mt="2"
									size="sm"
									colorScheme="pink"
									onClick={() => removeFromBasket(item._id)}
								>
									Remove from basket
								</Button>
							</li>
						))}
					</ul>
					<Box mt="20">
						<Text fontSize="22">Total: {total} $</Text>
					</Box>
				</>
			)}
		</Box>
	);
}

export default Basket;
