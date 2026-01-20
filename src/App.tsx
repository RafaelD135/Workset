import "./App.css";
import { invoke } from '@tauri-apps/api/core';
import { useEffect, useState } from "react";
import { 
    Button, 
    Text, 
    VStack, 
    HStack, 
    Box, 
    Input, 
    Heading
} from "@chakra-ui/react";

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
    tasks: number[]; // IDs des tâches
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    
    // Formulaire tâche Web
    const [webName, setWebName] = useState("");
    const [webUrl, setWebUrl] = useState("");

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

    // Lancer une seule tâche
    const handleLaunchTask = async (task: Task) => {
        try {
            await invoke('launch_task', { task });
        } catch (err) {
            alert("Erreur : " + err);
        }
    };

    // Lancer un Workspace complet
    const handleLaunchWorkspace = async (workspace: Workspace) => {
        try {
            // On envoie le workspace ET la liste de toutes les tâches pour le mapping
            await invoke('launch_workspace', { workspace, allTasks: tasks });
        } catch (err) {
            alert("Erreur Workspace : " + err);
        }
    };

    // Création tâche Web
    const handleCreateWebTask = async () => {
        if (!webName || !webUrl) return;

        const newTask: Task = {
            id: Date.now(), // ID temporaire basé sur le timestamp
            name: webName,
            config: {
                type: "Internet",
                params: { url: webUrl }
            }
        };

        const updated = [...tasks, newTask];
        setTasks(updated);
        await invoke('save_tasks', { tasks: updated });
        setWebName(""); setWebUrl("");
    };

    return (
        <Box p={8} maxW="800px" mx="auto">
            <Heading mb={8} size="xl" textAlign="center">🚀 Workset Manager</Heading>

            {/* --- SECTION WORKSPACES --- */}
            <Heading size="md" mb={4} color="blue.600">Mes Workspaces</Heading>
            <VStack align="stretch" mb={10}>
                {workspaces.map((ws) => (
                    <HStack 
                        key={ws.id} 
                        p={5} 
                        bg="blue.50" 
                        borderRadius="xl" 
                        borderWidth="2px" 
                        borderColor="blue.100"
                        justify="space-between"
                    >
                        <Box>
                            <Text fontWeight="bold" fontSize="lg">{ws.name}</Text>
                            <Text fontSize="sm" color="gray.600">
                                {ws.tasks.length} tâche(s) incluse(s)
                            </Text>
                        </Box>
                        <Button colorScheme="blue" size="lg" onClick={() => handleLaunchWorkspace(ws)}>
                            Tout Lancer
                        </Button>
                    </HStack>
                ))}
            </VStack>

            {/* --- SECTION FORMULAIRE --- */}
            <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" bg="white" mb={8}>
                <Text fontWeight="bold" mb={3}>Nouveau raccourci Web rapide</Text>
                <VStack>
                    <Input 
                        placeholder="Nom (ex: YouTube)" 
                        value={webName} 
                        onChange={(e) => setWebName(e.target.value)} 
                    />
                    <Input 
                        placeholder="URL (https://...)" 
                        value={webUrl} 
                        onChange={(e) => setWebUrl(e.target.value)} 
                    />
                    <Button colorScheme="green" width="full" onClick={handleCreateWebTask}>
                        Ajouter à la bibliothèque
                    </Button>
                </VStack>
            </Box>

            {/* --- SECTION BIBLIOTHÈQUE DE TÂCHES --- */}
            <Heading size="md" mb={4} color="gray.700">Bibliothèque de Tâches</Heading>
            <VStack align="stretch">
                {tasks.length === 0 ? (
                    <Text color="gray.400" textAlign="center">Aucune tâche</Text>
                ) : (
                    tasks.map((task) => (
                        <HStack 
                            key={task.id} 
                            p={3} 
                            borderWidth="1px" 
                            borderRadius="md" 
                            justify="space-between"
                            _hover={{ bg: "gray.50" }}
                        >
                            <Box>
                                <Text fontWeight="bold" fontSize="sm">{task.name}</Text>
                                <Text fontSize="xs" color="gray.500">{task.config.type}</Text>
                            </Box>
                            <Button size="xs" variant="outline" onClick={() => handleLaunchTask(task)}>
                                Test
                            </Button>
                        </HStack>
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default App;