import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../../api";
import { Box, Text, Button } from "@chakra-ui/react";
import moment from "moment";
import ImageGallery from "react-image-gallery";

function ProductDetail() {
	const { product_id } = useParams();

	const { isLoading, error, data } = useQuery(["product", product_id], () =>
		fetchProduct(product_id)
	);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>Error.</div>;
	}

  const images = data.photos.map((url) => ({ original: url }));
  
  console.log(process.env.REACT_APP_BASE_END_POINT);

	return (
		<div>
			<Button colorScheme="pink" variant="solid">
				Add to basket
			</Button>
			<Text as="h2" fontSize="2xl">
				{data.title}
			</Text>
			<Text>{moment(data.createdAt).format("DD/MM/YYYY")}</Text>
			<p>{data.description}</p>
			<Box margin="10">
				<ImageGallery items={images} showThumbnails={false} />
			</Box>
		</div>
	);
}

export default ProductDetail;
