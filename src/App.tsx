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

interface Task {
    name: string;
    config: {
        type: string;
        params: any;
    };
}

function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    
    // États pour le formulaire de création
    const [webName, setWebName] = useState("");
    const [webUrl, setWebUrl] = useState("");

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const res: Task[] = await invoke('load_tasks');
                setTasks(res);
            } catch (err) {
                console.error("Erreur chargement :", err);
            }
        };
        fetchTasks();
    }, []);

    const handleLaunch = async (task: Task) => {
        try {
            await invoke('launch_task', { task });
        } catch (err) {
            alert("Erreur : " + err);
        }
    };

    const handleDelete = async (indexToDelete: number) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
        try {
            await invoke('save_tasks', { tasks: updatedTasks });
        } catch (err) {
            console.error("Erreur sauvegarde :", err);
        }
    };

    const handleCreateWebTask = async () => {
        if (!webName || !webUrl) return;

        const newTask: Task = {
            name: webName,
            config: {
                type: "Internet",
                params: { url: webUrl }
            }
        };

        const updatedTasks = [...tasks, newTask];
        setTasks(updatedTasks);

        try {
            await invoke('save_tasks', { tasks: updatedTasks });
            setWebName("");
            setWebUrl("");
        } catch (err) {
            alert("Erreur : " + err);
        }
    };

    return (
        <Box p={8} maxW="700px" mx="auto">
            <Heading mb={6} size="lg">Workset Manager</Heading>

            {/* Section Formulaire Simplifiée */}
            <Box p={5} border="1px solid" borderColor="gray.200" borderRadius="md" bg="white" mb={8}>
                <Text fontWeight="bold" mb={3}>Ajouter une tâche Web</Text>
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
                        Enregistrer dans le JSON
                    </Button>
                </VStack>
            </Box>

            {/* Liste des tâches */}
            <VStack align="stretch">
                <Text fontSize="md" fontWeight="bold" borderBottom="1px solid" borderColor="gray.100" pb={2}>
                    Tâches sauvegardées
                </Text>
                
                {tasks.length === 0 ? (
                    <Text color="gray.400" py={4} textAlign="center">Aucune donnée trouvée</Text>
                ) : (
                    tasks.map((task, index) => (
                        <HStack 
                            key={index} 
                            p={4} 
                            borderWidth="1px" 
                            borderRadius="md" 
                            justify="space-between"
                        >
                            <Box flex={1} cursor="pointer" onClick={() => handleLaunch(task)}>
                                <Text fontWeight="bold">{task.name}</Text>
                                <Text fontSize="xs" color="gray.500">{task.config.type}</Text>
                            </Box>

                            <HStack>
                                <Button size="sm" colorScheme="blue" onClick={() => handleLaunch(task)}>
                                    Lancer
                                </Button>
                                <Button size="sm" colorScheme="red" variant="ghost" onClick={() => handleDelete(index)}>
                                    Supprimer
                                </Button>
                            </HStack>
                        </HStack>
                    ))
                )}
            </VStack>
        </Box>
    );
}

export default App;