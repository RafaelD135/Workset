import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamTerminal() {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Chemin du projet Terminal</Text>
			<Input 
				placeholder="C:/Users/Projets/MonApp" 
			/>
		</Box>
	);
}