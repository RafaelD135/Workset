import { Box, Input, Text } from "@chakra-ui/react";

export default function ParamInternet({ value, onChange }: any) {
	return (
		<Box>
			<Text mb={2} fontSize="sm" fontWeight="medium">Lien URL</Text>
			<Input
				placeholder="https://www.google.com"
				value={value.url || ""}
				onChange={(e) => onChange({ ...value, url: e.target.value })}
			/>
		</Box>
	);
}