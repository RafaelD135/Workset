import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamInternet() {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Adresse URL</Text>
			<Input 
				placeholder="https://www.example.com" 
			/>
		</Box>
	);
}