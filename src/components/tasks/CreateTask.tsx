import {
	Box,
	Button,
	Input,
	Text,
	VStack,
	Flex
} from "@chakra-ui/react";

import { useState } from "react";
import { useTheme as useNextTheme } from "next-themes";

import { invoke } from "@tauri-apps/api/core";

import ParamVsCode from "./createParam/ParamVsCode";
import ParamInternet from "./createParam/ParamInternet";
import ParamTerminal from "./createParam/ParamTerminal";
import ParamExplorer from "./createParam/ParamExplorer";

interface Task {
    id: number;
    name: string;
    config: {
        type: string;
        params: any;
    };
}


export default function CreateTask({ onNavigate }: { onNavigate: (page: string) => void }) {
	const { theme } = useNextTheme();
	const [name, setName] = useState("");
	const [type, setType] = useState("VsCode");
	const [params, setParams] = useState({});

	const renderParams = () => {
		switch (type) {
			case "VsCode": return <ParamVsCode value={params} onChange={setParams} />;
			case "Internet": return <ParamInternet value={params} onChange={setParams} />;
			case "Terminal": return <ParamTerminal value={params} onChange={setParams} />;
			case "FileExplorer": return <ParamExplorer value={params} onChange={setParams} />;
			default: return null;
		}
	};

	const handleCreate = async () => {
		try {
			const taskConfig = {
				type: type,
				params: params
			};

			await invoke("create_task", { 
				name: name, 
				config: taskConfig 
			});

			onNavigate("tasks");
		} catch (error) {
			console.error("Erreur Rust :", error);
		}
	};

	return (
		<Box
			p={6}
			bg={theme === "light" ? "gray.50" : "#0F1116"}
			borderRadius="xl"
			border="1px solid"
			borderColor={theme === "light" ? "gray.200" : "gray.800"}
		>
			<Text fontSize="xl" fontWeight="bold" mb={6}>{name || "Nouvelle tâche"}</Text>

			<VStack align="stretch">
				{/* Champ Nom */}
				<Box>
					<Text mb={2} fontSize="sm" fontWeight="medium">Nom de la tâche</Text>
					<Input
						placeholder="Ex: Mon Projet"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Box>

				{/* Sélecteur de Type */}
				<Box>
					<Text mb={2} fontSize="sm" fontWeight="medium">Type</Text>
					<Box
						as="select"
						onChange={(e: any) =>{
							setType(e.target.value);
							setParams({});
						}}
						width="100%"
						height="40px"
						px={3}
						borderRadius="md"
						border="1px solid"
						borderColor={theme === "light" ? "gray.200" : "gray.700"}
						bg={theme === "light" ? "white" : "gray.800"}
						color={theme === "light" ? "black" : "white"}
						outline="none"
					>
						<option value="VsCode">VS Code</option>
						<option value="Terminal">Terminal</option>
						<option value="FileExplorer">Explorateur</option>
						<option value="Internet">Navigateur</option>
					</Box>
				</Box>

				<Box 
					h="1px" 
					w="100%" 
					bg={theme === "light" ? "gray.200" : "gray.700"} 
					my={6} 
				/>
				
				{/* Rendu des paramètres déportés */}
				<Box>
					{renderParams()}
				</Box>

				{/* Boutons */}
				<Flex justify="flex-end" gap={3} pt={4}>
					<Button variant="ghost" onClick={() => onNavigate("tasks")}>Annuler</Button>
					<Button
						bg={theme === "light" ? "blue.500" : "blue.600"}
						color="white"
						_hover={{
							bg: theme === "light" ? "blue.600" : "blue.500",
						}}
						_disabled={{
							bg: theme === "light" ? "gray.200" : "gray.700",
							color: "gray.500",
							cursor: "not-allowed",
							_hover: { bg: theme === "light" ? "gray.200" : "gray.700" }
						}}
						disabled={!name}
						onClick={handleCreate}
						px={8}
					>
						{"Créer la tâche"}
					</Button>
				</Flex>
			</VStack>
		</Box>
	);
}