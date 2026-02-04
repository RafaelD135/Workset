import { 
    Box, 
    Button, 
    Input, 
    Text, 
    VStack, 
    Flex 
} from "@chakra-ui/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useTheme as useNextTheme } from "next-themes";

export default function CreateTask() {
    const { t } = useTranslation();
    const { theme } = useNextTheme();

    const [name, setName] = useState("");
    const [type, setType] = useState("VsCode");
    const [pathOrUrl, setPathOrUrl] = useState("");

    const handleCreate = () => {
        const newTask = {
            name,
            config: {
                type: type,
                params: {
                    [type === "Internet" ? "url" : "path"]: pathOrUrl
                }
            }
        };
        console.log("Données envoyées :", newTask);
    };

    return (
        <Box 
            p={6} 
            bg={theme === "light" ? "gray.50" : "#0F1116"} 
            borderRadius="xl" 
            border="1px solid" 
            borderColor={theme === "light" ? "gray.200" : "gray.800"}
        >
            <Text fontSize="xl" fontWeight="bold" mb={6}>
                {t("add_task") || "Créer une nouvelle tâche"}
            </Text>

            {/* Formulaire simplifié avec VStack (qui gère l'alignement) */}
            <VStack align="stretch">
                
                <Box mb={4}>
                    <Text mb={2} fontSize="sm" fontWeight="medium">Nom</Text>
                    <Input 
                        placeholder="Nom de la tâche" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </Box>

                <Box mb={4}>
                    <Text mb={2} fontSize="sm" fontWeight="medium">Type</Text>
					<Box mb={4}>
						{/* On utilise l'élément select HTML de base */}
						<Box 
							as="select" 
							onChange={(e: any) => setType(e.target.value)}
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
                </Box>

                <Box mb={6}>
                    <Text fontSize="sm" fontWeight="medium">
                        {type === "Internet" ? "URL" : "Chemin"}
                    </Text>
                    <Input 
                        placeholder={type === "Internet" ? "https://..." : "/path/to/folder"} 
                        value={pathOrUrl} 
                        onChange={(e) => setPathOrUrl(e.target.value)} 
                    />
                </Box>

                <Flex justify="flex-end" gap={3}>
                    <Button variant="ghost">
                        Annuler
                    </Button>
                    <Button colorScheme="blue" onClick={handleCreate}>
                        Enregistrer
                    </Button>
                </Flex>
            </VStack>
        </Box>
    );
}