import { Box, Image, Button } from "@chakra-ui/react";

import { Link } from "react-router-dom";

function Card() {
	return (
		<Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="3">
			<Link to="#/">
				<Image
					src="https://picsum.photos/id/10/200/201"
					alt="product"
				/>

				<Box p="6">
					<Box d="plex" alignItems="baseline">
						12/12/2022
					</Box>
					<Box fontWeight="semibold" as="h4" lineHeight="tight">
						Macbook Air
					</Box>
					<Box>1.000 $</Box>
				</Box>
			</Link>
			<Button colorScheme="pink">Add to basket</Button>
		</Box>
	);
}
export default Card;
