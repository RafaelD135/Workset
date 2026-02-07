import { useState } from "react";

import { Box, Flex, VStack, Button, Heading, Text, HStack, Spacer } from "@chakra-ui/react";

import { useTheme as useNextTheme } from "next-themes";

import { useTranslation } from "react-i18next";

import Dashboard from "./components/Dashboard";
import WorkspaceList from "./components/WorkspaceList";
import TaskList from "./components/TaskList";
import Settings from "./components/Settings";

import CreateTask from "./components/tasks/CreateTask";

import AppLogo from "./assets/icon.png";

export default function App() {
    const { theme, setTheme } = useNextTheme();
    const { t, i18n } = useTranslation();
    
    const [activePage, setActivePage] = useState("dashboard");

    const renderContent = () => {
        switch (activePage) {
            case "dashboard":
                return <Dashboard onNavigate={setActivePage} />;
            case "workspaces":
                return <WorkspaceList onNavigate={setActivePage} />;
            case "tasks":
                return <TaskList onNavigate={setActivePage} />;
            case "settings":
                return <Settings />;
            case "create_task":
                return <CreateTask onNavigate={setActivePage} />;
            default:
                return <Text>Page inconnue</Text>;
        }
    };

    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            {/* Bar de navigation */}
            <Flex 
                w="260px" 
                direction="column"
                bg={theme === "light" ? "gray.50" : "#0F1116"} 
                borderRight="1px solid" 
                borderColor={theme === "light" ? "gray.200" : "#212530"}
                p={5}
            >
                {/* Heading avec Logo et Texte */}
                <Heading size="md" mb={10} color="blue.500">
                    <HStack>
                        <img 
                            src={AppLogo} 
                            alt="Workset Logo" 
                            style={{ width: "28px", height: "28px" }} 
                        />
                        <Text>Workset</Text>
                    </HStack>
                </Heading>                
                <VStack align="stretch">
                    <NavButton 
                        isActive={activePage === "dashboard"} 
                        onClick={() => setActivePage("dashboard")}
                        label={t("dashboard")}
                    />
                    <NavButton 
                        isActive={activePage === "workspaces"} 
                        onClick={() => setActivePage("workspaces")}
                        label={t("workspaces")}
                    />
                    <NavButton 
                        isActive={activePage === "tasks" || activePage === "create_task"} 
                        onClick={() => setActivePage("tasks")}
                        label={t("tasks")}
                    />
                    <NavButton 
                        isActive={activePage === "settings"} 
                        onClick={() => setActivePage("settings")}
                        label={t("settings")}
                    />
                </VStack>

                <Spacer />

                <Box pt={10}>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                        Workset &#169;Rafael
                    </Text>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                       ( In development )
                    </Text>
                </Box>
            </Flex>

            {/* Zone de contenu principal */}
            <Box 
                flex={1} 
                p={10} 
                bg={theme === "light" ? "white" : "#090C10"} 
                color={theme === "light" ? "black" : "#e2e2e2"}
                overflowY="auto"
            >
                {renderContent()}
            </Box>

			{/* SECTION DEV - BAS GAUCHE */}
			<div style={{ position: 'fixed', bottom: '20px', left: '20px', display: 'flex', gap: '10px', zIndex: 9999 }}>
				{/* Bouton Thème : Affiche T pour Theme */}
				<button 
					onClick={() => {
						const nextTheme = theme === "light" ? "dark" : "light";
						// On utilise la fonction de ton import useNextTheme
						setTheme(nextTheme);

					}}
					style={{ width: '40px', height: '40px', backgroundColor: '#3182ce', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
				>
					T
				</button>

				{/* Bouton Langue : Affiche L pour Langue */}
				<button 
					onClick={() => {
						// On bascule entre 'fr' et 'en'
						const nextLanguage = i18n.language === "fr" ? "en" : "fr";
						i18n.changeLanguage(nextLanguage);
					}}
					style={{ width: '40px', height: '40px', backgroundColor: '#718096', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
				>
					L
				</button>
			</div>
        </Flex>
    );
}

function NavButton({ isActive, onClick, label }: any) {
    const { theme } = useNextTheme();

    return (
        <Button 
            onClick={onClick}
            variant={isActive ? "solid" : "ghost"}
            bg={isActive ? (theme === "light" ? "blue.300" : "blue.900"): "transparent"}
            color={isActive ? (theme === "light" ? "blue.700" : "#83DFFF") : (theme === "light" ? "gray.700" : "gray.300")}
            _hover={{ bg: isActive ? (theme === "light" ? "blue.200" : "blue.800") : (theme === "light" ? "blue.100" : "blue.800") }}
            colorScheme={isActive ? "blue" : "gray"}
            justifyContent="start"
            width="full"
        >
            <Text ml={2}>{label}</Text>
        </Button>
    );
}