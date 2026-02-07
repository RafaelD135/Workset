import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamExplorer({ value, onChange }: any) {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Dossier à ouvrir</Text>
			<Input
				placeholder="C:/Users/Downloads"
				value={value.path || ""}
				onChange={(e) => onChange({ ...value, path: e.target.value })}
			/>
		</Box>
	);
}