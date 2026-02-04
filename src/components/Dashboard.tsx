import { 
    Box,
	Button,
	Flex,
	Heading,
	SimpleGrid,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { invoke } from '@tauri-apps/api/core';

import { useTranslation } from "react-i18next";
import { useTheme as useNextTheme } from "next-themes";

import WorkspaceComponent from "./workspaces/WorkspaceComponent";
import TaskComponent from "./tasks/TaskComponent";

// Types correspondants au Rust
interface Task {
    id: number;
    name: string;
    config: {
        type: string;
        params: any;
    };
}

interface Workspace {
    id: number;
    name: string;
    tasks: number[];
}

export default function Dashboard({ onNavigate }: { onNavigate: (page: string) => void }) {
	const { t } = useTranslation();
    const { theme } = useNextTheme();

	const [tasks, setTasks] = useState<Task[]>([]);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

	    // Chargement initial
    useEffect(() => {
        const fetchData = async () => {
            try {
                const t: Task[] = await invoke('load_tasks');
                const w: Workspace[] = await invoke('load_workspaces');
                setTasks(t);
                setWorkspaces(w);
            } catch (err) {
                console.error("Erreur chargement :", err);
            }
        };
        fetchData();
    }, []);

    return (
		<Box maxW="1300px">
			<Heading size="lg" mb={6}>{t("dashboard")}</Heading>

			{/* Section des workspaces */}
			<Box mb={10}>
				<Flex justify="space-between" align="center" mb={4}>
					<Heading size="sm">{t("workspaces")}</Heading>
					<Button 
						variant="ghost" 
						size="sm" 
						color="blue.400"
						onClick={() => onNavigate("workspaces")}
						_hover={{ bg: "transparent", color: "blue.500" }}
					>
						{t("see_all")}
					</Button>
				</Flex>

				{/* Liste des workspaces */}
				<SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 3 }} gap={5}>
					{workspaces.slice(0,6).map((ws: any) => (
						<WorkspaceComponent key={ws.id} workspace={ws} />
					))}
				</SimpleGrid>
			</Box>

			{/* Section des tasks */}
			<Box mb={10}>
				<Flex justify="space-between" align="center" mb={4}>
					<Heading size="sm">{t("tasks")}</Heading>
					<Button 
						variant="ghost" 
						size="sm" 
						color="blue.400"
						onClick={() => onNavigate("tasks")}
						_hover={{ bg: "transparent", color: "blue.500" }}
					>
						{t("see_all")}
					</Button>
				</Flex>

				{/* Liste des tasks */}
				<SimpleGrid columns={{ base: 1, md: 1, lg: 2, xl: 3 }} gap={5}>
					{tasks.slice(0,6).map((task: any) => (
						<TaskComponent key={task.id} task={task} />
					))}
				</SimpleGrid>
			</Box>
		</Box>
	);
}