import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamTerminal({ value, onChange }: any) {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Chemin de lancement</Text>
			<Input
				placeholder="C:/Users/Projets/MonApp"
				value={value.path || ""}
				onChange={(e) => onChange({ ...value, path: e.target.value })}
			/>
		
			<Text mb={2} fontSize="sm" fontWeight="medium">Commande à exécuter</Text>
			<Input
				placeholder="npm run dev"
				value={value.command || ""}
				onChange={(e) => onChange({ ...value, command: e.target.value })}
			/>
		</Box>
	);
}