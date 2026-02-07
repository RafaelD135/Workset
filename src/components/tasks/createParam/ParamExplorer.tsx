import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamExplorer() {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Chemin du projet</Text>
			<Input 
				placeholder="C:/Users/Projets/MonApp" 
			/>
		</Box>
	);
}