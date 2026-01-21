import { useTheme as useNextTheme } from "next-themes";

import { useTranslation } from "react-i18next";

import { Box, Button, Heading, HStack, NativeSelectRoot, NativeSelectField } from "@chakra-ui/react";

export default function App() {
    const { theme, setTheme } = useNextTheme();
    const { t, i18n } = useTranslation();

    const changeLanguage = async (lng: string) => {
        i18n.changeLanguage(lng);
        // Ici, on pourra appeler Rust pour sauvegarder dans config.json plus tard
        // await invoke("save_config", { config: { ...currentConfig, language: lng } });
    };

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
            justifyContent="center">
            <div>
                <Heading>{t("welcome")}</Heading>

                <HStack>
                    <NativeSelectRoot width="120px">
                        <NativeSelectField value={i18n.language} onChange={(e) => changeLanguage(e.target.value)}>
                            <option value="fr">Français</option>
                            <option value="en">English</option>
                        </NativeSelectField>
                    </NativeSelectRoot>
                </HStack>
            </div>
            <div>
                <Button onClick={toggle}>
                    {t("theme_toggle")}
                </Button>
            </div>
        </Box>
    );
}
