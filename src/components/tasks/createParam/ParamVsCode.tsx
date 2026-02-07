import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamVsCode({ value, onChange }: any) {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Chemin du projet VS Code</Text>
			<Input
				placeholder="C:/Users/Projets/MonApp"
				value={value.path || ""}
				onChange={(e) => onChange({ ...value, path: e.target.value })}
			/>
		</Box>
	);
}