import { useTheme as useNextTheme } from "next-themes";
import { Box, Button } from "@chakra-ui/react";

export default function App() {
    const { theme, setTheme } = useNextTheme();

    const toggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Box
            w="100vw"
            h="100vh"
            bg={theme === "light" ? "white" : "gray.800"}
            color={theme === "light" ? "black" : "white"}
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Button onClick={toggle}>
                Toggle Mode
            </Button>
        </Box>
    );
}
