import { Grid } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import { useQuery } from "react-query";

import { fetchProductList } from "../../api";
import Card from "../../components/Card";

function Products() {
	const {
		data,
		error,
		fetchNextPage,
		hasNextPage,
		isFetching,
		isFetchingNextPage,
		status,
	} = useInfiniteQuery("products", fetchProductList, {
		getNextPageParam: (lastGroup, allGroups) => {
			const morePagesExist = lastGroup?.length === 12;
			if (!morePagesExist) {
				return;
			}
			return allGroups.length + 1;
		},
	});

	if (status === "loading") return "Loading...";

	if (status === "error") return "An error has occurred: " + error.message;

	console.log("data", data);

	return (
		<div>
			<Grid templateColumns="repeat(3, 1fr)" gap={4}>
				{data.map((item, key) => (
					<Card key={key} item={item} />
				))}
			</Grid>
		</div>
	);
}

export default Products;
