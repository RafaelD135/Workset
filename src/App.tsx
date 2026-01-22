import { useState } from "react";

import { Box, Flex, VStack, Button, Heading, Text } from "@chakra-ui/react";

import { useTheme as useNextTheme } from "next-themes";

import { useTranslation } from "react-i18next";

import Dashboard from "./components/Dashboard";
import WorkspaceList from "./components/WorkspaceList";
import TaskList from "./components/TaskList";
import Settings from "./components/Settings";

export default function App() {
    const { theme } = useNextTheme();
    const { t } = useTranslation();
    
    const [activePage, setActivePage] = useState("dashboard");

    const renderContent = () => {
        switch (activePage) {
            case "dashboard":
                return <Dashboard />;
            case "workspaces":
                return <WorkspaceList />;
            case "tasks":
                return <TaskList />;
            case "settings":
                return <Settings />;
            default:
                return <Text>Page inconnue</Text>;
        }
    };

    return (
        <Flex h="100vh" w="100vw" overflow="hidden">
            {/* Bar de navigation */}
            <Box 
                w="260px" 
                bg={theme === "light" ? "gray.50" : "#0F1116"} 
                borderRight="1px solid" 
                borderColor={theme === "light" ? "gray.200" : "#212530"}
                p={5}
            >
                <Heading size="md" mb={10} color="blue.500">Workset</Heading>
                
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
                        isActive={activePage === "tasks"} 
                        onClick={() => setActivePage("tasks")}
                        label={t("tasks")}
                    />
                    <NavButton 
                        isActive={activePage === "settings"} 
                        onClick={() => setActivePage("settings")}
                        label={t("settings")}
                    />
                </VStack>

                <Box pt={10}>
                    <Text fontSize="xs" color="gray.500" textAlign="center">
                        Workset - v1.0.0
                    </Text>
                </Box>
            </Box>

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