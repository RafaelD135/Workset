import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamVsCode() {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Chemin du projet VS Code</Text>
			<Input 
				placeholder="C:/Users/Projets/MonApp" 
			/>
		</Box>
	);
}