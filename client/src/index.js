import * as ReactDOM from "react-dom";
import React from "react";
import "./reset.css";
import "./index.css";

import { QueryClient, QueryClientProvider } from "react-query";

import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const queryClient = new QueryClient();

ReactDOM.render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ChakraProvider>
				<App />
			</ChakraProvider>
		</QueryClientProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

reportWebVitals();
