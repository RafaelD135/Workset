import { 
    Box, 
    Heading, 
    Text, 
    VStack, 
    HStack, 
    Button, 
    NativeSelectRoot, 
    NativeSelectField 
} from "@chakra-ui/react";

import { useTheme as useNextTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function Settings() {
    const { theme, setTheme } = useNextTheme();
    const { t, i18n } = useTranslation();

    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    return (
        <Box maxW="600px">
            <Heading size="lg" mb={6}>{t("settings")}</Heading>

            <VStack align="stretch">
                
                {/* Section : Apparence */}
                <Box>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={4} textTransform="uppercase">
                        {t("appearance") || "Apparence"}
                    </Text>
                    <HStack justify="space-between" p={4} borderWidth="1px" borderRadius="md">
                        <Box>
                            <Text fontWeight="medium">{t("theme_mode") || "Mode de couleur"}</Text>
                            <Text fontSize="sm" color="gray.500">
                                {theme === "light" ? t("light_mode_activated"): t("dark_mode_activated")}
                            </Text>
                        </Box>
                        <Button onClick={toggleTheme} size="sm" variant="outline">
                            {theme === "light" ? t("switch_to_dark_mode"): t("switch_to_light_mode")}
                        </Button>
                    </HStack>
                </Box>

                {/* Section : Langue */}
                <Box>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={4} textTransform="uppercase">
                        {t("language_settings")}
                    </Text>
                    <HStack justify="space-between" p={4} borderWidth="1px" borderRadius="md">
                        <Box>
                            <Text fontWeight="medium">{t("language")}</Text>
                            <Text fontSize="sm" color="gray.500">{t("select_your_language")}</Text>
                        </Box>
                        <NativeSelectRoot width="150px">
                            <NativeSelectField 
                                value={i18n.language} 
                                onChange={(e) => i18n.changeLanguage(e.target.value)}
                            >
                                <option value="fr">Français</option>
                                <option value="en">English</option>
                            </NativeSelectField>
                        </NativeSelectRoot>
                    </HStack>
                </Box>
            </VStack>
        </Box>
    );
}