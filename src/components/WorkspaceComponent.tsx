import { 
	Box,
	Text,
	Flex,
	HStack,
	VStack,
	IconButton,
	SkeletonCircle
} from "@chakra-ui/react";

import { invoke } from '@tauri-apps/api/core';

import { FaPlay } from "react-icons/fa";

import { useTranslation } from "react-i18next";
import { useTheme as useNextTheme } from "next-themes";

interface Workspace {
    id: number;
    name: string;
    tasks: number[];
}

export default function WorkspaceComponent({ workspace }: any) {
	const { t } = useTranslation();
    const { theme } = useNextTheme();

	const handleLaunchWorkspace = async (workspace: Workspace) => {
        try {
            await invoke('launch_workspace', { workspace });
        } catch (err) {
            alert("Erreur Workspace : " + err);
        }
    };

	return (
		<Box
			bg={theme === "light" ? "gray.50" : "#0F1116"}
			border="1px solid" 
            borderColor={theme === "light" ? "gray.200" : "gray.800"}
            borderRadius="xl"
            p={4}
            transition="all 0.2s"
            _hover={{ transform: "translateY(-2px)", borderColor: "blue.500" }}
            cursor="pointer"
            w="100%"
		>
			<Flex align="center" justify="space-between">
                <HStack>
                    {/* Placeholder pour l'icône (vide pour l'instant) */}
                    <SkeletonCircle size="10" bg={theme === "light" ? "gray.300" : "gray.600"} />

                    <VStack align="start">
                        <Text 
                            fontSize="md" 
                            color={theme === "light" ? "gray.800" : "gray.100"}
                        >
                            {workspace.name}
                        </Text>
                        <Text 
                            fontSize="sm" 
                            color={theme === "light" ? "gray.600" : "gray.400"}
                        >
                            {/* Affiche du nombre de tâches */}
                            {workspace.tasks.length} {t("available_tasks")}
                        </Text>
                    </VStack>
                </HStack>

                {/* Bouton Play à droite */}
                <IconButton
                    aria-label="Launch Workspace"
                    size="md"
					borderRadius="full"
                    bg={theme === "light" ? "blue.300" : "blue.900"}
					color={theme === "light" ? "#173DA6" : "#83DFFF"}
                    _hover={{ bg: theme === "light" ? "#173DA6" : "#83DFFF" , color: theme === "light" ? "blue.300" : "blue.900" }}
					onClick={() => handleLaunchWorkspace(workspace)}
                >
					<FaPlay
						style={{ marginLeft: "2px" }}
						size={16}
					/>
				</IconButton>

            </Flex>
		</Box>
	);
}