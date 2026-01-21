import React from "react";
import ReactDOM from "react-dom/client";

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider } from "next-themes";

import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<ThemeProvider attribute="class">
				<ChakraProvider value={defaultSystem}>
					<App />
				</ChakraProvider>
		</ThemeProvider>
	</React.StrictMode>,
);
