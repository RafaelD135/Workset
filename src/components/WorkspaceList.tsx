import { 
    Box, 
    Button, 
    Flex, 
    Heading, 
    SimpleGrid, 
    Text, 
    VStack 
} from "@chakra-ui/react";

import { useState, useEffect } from "react";
import { invoke } from '@tauri-apps/api/core';
import { useTranslation } from "react-i18next";
import { useTheme as useNextTheme } from "next-themes";
import { FaPlus } from "react-icons/fa";

import WorkspaceComponent from "./WorkspaceComponent";

interface Workspace {
    id: number;
    name: string;
    tasks: number[];
}

export default function WorkspaceList() {
    const { t } = useTranslation();
    const { theme } = useNextTheme();
    
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorkspaces = async () => {
            try {
                const data: Workspace[] = await invoke('load_workspaces');
                setWorkspaces(data);
            } catch (err) {
                console.error("Erreur chargement workspaces :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchWorkspaces();
    }, []);

    return (
        <Box maxW="1300px">
            {/* Header de la page */}
            <Flex justify="space-between" align="center" mb={8}>
                <VStack align="start" gap={1}>
                    <Heading size="lg">{t("workspaces")}</Heading>
                    <Text fontSize="sm" color="gray.500">
                        {workspaces.length} {t("workspaces_total_count")}
                    </Text>
                </VStack>

                <Button 
                    colorScheme="blue" 
                    size="md"
                    borderRadius="lg"
                    onClick={() => console.log("Ouvrir modal création workspace")}
                >
                    {t("add_workspace")} <Box as={FaPlus} ml={2} />
                </Button>
            </Flex>

            {/* Grille complète des workspaces */}
            {workspaces.length > 0 ? (
                <SimpleGrid columns={{ base: 1}} gap={5}>
                    {workspaces.map((ws) => (
                        <WorkspaceComponent key={ws.id} workspace={ws} showEdit={true} />
                    ))}
                </SimpleGrid>
            ) : (
                <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    py={20} 
                    border="2px dashed" 
                    borderColor={theme === "light" ? "gray.200" : "gray.800"}
                    borderRadius="2xl"
                >
                    <Text color="gray.500" mb={4}>{t("no_workspaces_found")}</Text>
                    <Button variant="outline" size="sm" onClick={() => {}}>
                        {t("create_first_workspace")}
                    </Button>
                </Flex>
            )}
        </Box>
    );
}