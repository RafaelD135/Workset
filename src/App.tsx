import { Button, HStack, Heading, Box } from "@chakra-ui/react"

function App() {
  return (
    <Box p={10}>
      <Heading mb={4}>Electron + Chakra v3 !</Heading>
      <HStack>
        <Button colorPalette="blue">Bouton Chakra</Button>
        <Button variant="outline">Test</Button>
      </HStack>
      <Heading color="blue.500" mb="4">Workset est prêt !</Heading>
      <Button colorPalette="blue" size="lg">
        Mon Bouton Bleu Chakra
      </Button>
    </Box>
  )
}

export default App