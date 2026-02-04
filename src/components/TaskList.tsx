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

import TaskComponent from "./TaskComponent";

interface Task {
    id: number;
    name: string;
    config: {
        type: string;
        params: any;
    };
}

export default function TaskList() {
    const { t } = useTranslation();
    const { theme } = useNextTheme();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const data: Task[] = await invoke('load_tasks');
                setTasks(data);
            } catch (err) {
                console.error("Erreur chargement tâches :", err);
            } finally {
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    return (
        <Box maxW="1300px">
            {/* Header de la page */}
            <Flex justify="space-between" align="center" mb={8}>
                <VStack align="start" gap={1}>
                    <Heading size="lg">{t("tasks")}</Heading>
                    <Text fontSize="sm" color="gray.500">
                        {tasks.length} {t("tasks_total_count")}
                    </Text>
                </VStack>

                <Button 
                    colorScheme="blue" 
                    size="md"
                    borderRadius="lg"
                    onClick={() => console.log("Ouvrir modal création tâche")}
                >
                    {t("add_task")} <Box as={FaPlus} ml={2} />
                </Button>
            </Flex>

            {/* Grille complète des tâches */}
            {tasks.length > 0 ? (
                <SimpleGrid columns={{ base: 1 }} gap={5}>
                    {tasks.map((task) => (
                        <TaskComponent key={task.id} task={task} showEdit={true} />
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
                    <Text color="gray.500" mb={4}>{t("no_tasks_found")}</Text>
                    <Button variant="outline" size="sm" onClick={() => {}}>{t("create_first_task")}</Button>
                </Flex>
            )}
        </Box>
    );
}