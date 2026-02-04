import { 
    Box,
    Text,
    Flex,
    HStack,
    VStack,
    IconButton,
    Image
} from "@chakra-ui/react";

import { invoke } from '@tauri-apps/api/core';
import { FaPlay } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { useTheme as useNextTheme } from "next-themes";

// Import des icônes
import VscodeIcon from "../../assets/taskIcons/vscode.svg"; 
import TerminalIcon from "../../assets/taskIcons/terminal.svg";
import ExplorerIcon from "../../assets/taskIcons/explorer.svg";
import BrowserIcon from "../../assets/taskIcons/browser.svg";

interface Task {
    id: number;
    name: string;
    config: {
        type: string;
        params: any;
    };
}

export default function TaskComponent({ task, showEdit = false }: { task: Task, showEdit?: boolean }) {
    const { t } = useTranslation();
    const { theme } = useNextTheme();

    // Fonction pour déterminer quelle icône afficher et quel sous-texte
    const getTaskDetails = () => {
        if (task.config.type === "VsCode") return { icon: VscodeIcon, sub: task.config.params.path };
        if (task.config.type === "Terminal") return { icon: TerminalIcon, sub: task.config.params.command || "Terminal" };
        if (task.config.type === "FileExplorer") return { icon: ExplorerIcon, sub: task.config.params.path };
        if (task.config.type === "Internet") return { icon: BrowserIcon, sub: task.config.params.url };
        return { icon: null, sub: "" };
    };

    const { icon, sub } = getTaskDetails();

    const handleLaunchTask = async () => {
        try {
            // On envoie la tâche complète à Rust
            await invoke('launch_task', { task });
        } catch (err) {
            console.error("Erreur Task : ", err);
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
                    {/* Affichage de l'icône correspondante */}
                    <Box boxSize="40px" display="flex" alignItems="center" justifyContent="center">
                        {icon && <Image src={icon} alt="task-icon" boxSize="30px" />}
                    </Box>

                    <VStack align="start" gap={0}>
                        <Text 
                            fontSize="md" 
                            fontWeight="bold"
                            color={theme === "light" ? "gray.800" : "gray.100"}
                        >
                            {task.name}
                        </Text>
                        <Text 
                            fontSize="xs" 
                            color={theme === "light" ? "gray.500" : "gray.500"}
                            maxW="200px"
                        >
                            {sub}
                        </Text>
                    </VStack>
                </HStack>

                <HStack>
                    {/* Affichage du bouton d'édition si showEdit est vrai */}
                    {showEdit && (
                        <IconButton
                            aria-label="Edit Task"
                            size="md"
                            borderRadius="full"
                            bg={theme === "light" ? "gray.200" : "gray.700"}
                            color={theme === "light" ? "gray.800" : "gray.100"}
                            _hover={{ bg: theme === "light" ? "gray.300" : "gray.600" }}
                            onClick={(e) => {
                                e.stopPropagation();
                                console.log("Ouvrir modal édition tâche pour :", task.id);
                            }}
                        >
                            <IoMdSettings/>
                        </IconButton>
                    )}

                    {/* Bouton Play */}
                    <IconButton
                        aria-label="Launch Task"
                        size="md"
                        borderRadius="full"
                        bg={theme === "light" ? "blue.300" : "blue.900"}
                        color={theme === "light" ? "#173DA6" : "#83DFFF"}
                        _hover={{ bg: theme === "light" ? "#173DA6" : "#83DFFF" , color: theme === "light" ? "blue.300" : "blue.900" }}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLaunchTask();
                        }}
                    >
                        <FaPlay style={{ marginLeft: "2px" }} size={14} />
                    </IconButton>
                </HStack>
            </Flex>
        </Box>
    );
}