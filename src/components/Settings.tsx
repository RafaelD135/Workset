import { 
    Box, 
    Heading, 
    Text, 
    VStack, 
    HStack, 
    Button, 
    NativeSelectRoot, 
    NativeSelectField,
    Switch,
    Separator
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
        <Box maxW="1000px">
            <Heading size="lg" mb={6}>{t("settings")}</Heading>

            <VStack align="stretch">
                
                {/* Section : Apparence */}
                <Box mb={5}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={4} textTransform="uppercase">
                        {t("appearance")}
                    </Text>
                    <HStack justify="space-between" p={4} borderWidth="1px" borderRadius="md">
                        <Box>
                            <Text fontWeight="medium">{t("theme_mode")}</Text>
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
                <Box mb={5}>
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

                {/* Section : Lancement automatique */}
                <Box mb={5}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500" mb={4} textTransform="uppercase">
                        {t("autostart_settings")}
                    </Text>
                    <HStack justify="space-between" p={4} borderWidth="1px" borderRadius="md">
                        <Box>
                            <Text fontWeight="medium">{t("launch_at_startup")}</Text>
                            <Text fontSize="sm" color="gray.500">{t("manage_autostart_settings")}</Text>
                        </Box>
                            <Switch.Root colorScheme="blue">
                                <Switch.Control>
                                    <Switch.Thumb />
                                </Switch.Control>
                            </Switch.Root>
                    </HStack>
                </Box>

                <Separator mb={5} />

                {/* Section : Réinitialisation */}
                <Box mb={5}>
                    <Text fontSize="sm" fontWeight="bold" color="red.500" mb={4} textTransform="uppercase">
                        {t("delete_data")}
                    </Text>
                    <HStack justify="space-between" p={4} borderWidth="1px" borderRadius="md" borderColor={theme === "light" ? "red.300" : "red.900"} bg={theme === "light" ? "red.50" : "red.950"}>
                        <Box>
                            <Text fontWeight="medium">{t("delete_data")}</Text>
                            <Text fontSize="sm" color={theme === "dark" ? "red.400" : "red.600"}>{t("delete_data")}</Text>
                        </Box>
                        <Button colorScheme="red" variant="surface" size="sm" bg={theme === "light" ? "red.200" : "red.800"} _hover={{ bg: theme === "light" ? "red.300" : "red.700" }}>
                            {t("delete_data")}
                        </Button>
                    </HStack>
                </Box>        
            </VStack>
        </Box>
    );
}