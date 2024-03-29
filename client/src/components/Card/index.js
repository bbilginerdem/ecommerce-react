import { Box, Image, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
// used moment for human readable date
import moment from "moment";

import { useBasket } from "../../contexts/BasketContext";

function Card({ item }) {
	const { addToBasket, items } = useBasket();

	const findBasketItem = items.find(
		(basket_item) => basket_item._id === item._id
	);

	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
			<Link to={`/product/${item._id}`}>
				<Image
					src={item.photos[0]}
					alt="product"
					// to prevent loading of images directly
					loading="lazy"
					width="100%"
				/>

				<Box p="6">
					<Box d="flex" alignItems="baseline">
						{moment(item.createdAt).format("DD/MM/YYYY")}
					</Box>
					<Box fontWeight="semibold" as="h4" lineHeight="tight">
						{item.title}
					</Box>
					<Box>{item.price}</Box>
				</Box>
			</Link>
			<Button
				colorScheme={findBasketItem ? "green" : "pink"}
				variant="solid"
				onClick={() => addToBasket(item, findBasketItem)}
			>
				{findBasketItem ? "Remove from basket" : "Add to basket"}
			</Button>
		</Box>
	);
}
export default Card;
