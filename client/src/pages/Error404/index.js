import React from "react";

import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

function Error404() {
	return (
		<Alert status="error">
			<AlertIcon />
			<AlertTitle>Page not found!</AlertTitle>
		</Alert>
	);
}

export default Error404;
