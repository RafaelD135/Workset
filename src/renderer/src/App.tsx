import { useState } from 'react'
import {
	Box,
	VStack,
	Heading,
	Text,
	Button,
	Code
} from "@chakra-ui/react"

// IMPORTATION DES TYPES (Vérifie bien tes chemins de dossiers !)
import {type  Workspace } from '../../models/WorkspaceModel'
import { type Task } from '../../models/TaskModel'

function App() {
	const [lastSaved, setLastSaved] = useState<Workspace[] | null>(null)
	const [loading, setLoading] = useState(false)

	const handleTestCommunication = async () => {
		setLoading(true)
		try {
			// Ici on définit explicitement que window.api respecte notre contrat
			const api = (window as any).api

			if (!api) {
				alert("L'objet window.api est introuvable. Vérifie ton Preload !")
				return
			}

			// CRÉATION D'UNE TÂCHE QUI RESPECTE LE MODÈLE Task
			const taskTest: Task = {
				id: 'task-' + Date.now(),
				type: 'vscode',
				label: 'Ouvrir VS Code',
				value: undefined,
				path: '/',
			}

			// CRÉATION DU WORKSPACE QUI RESPECTE LE MODÈLE Workspace
			const testWS: Workspace = {
				id: 'ws-' + Date.now(),
				name: 'Mon Premier Workspace',
				description: 'Ceci est un test avec typage fort',
				tasks: [taskTest],
				createdAt: Date.now()
			}

			console.log("Envoi au Main Process...", testWS)

			// 1. Sauvegarde
			await api.saveWorkspace(testWS)

			// 2. Récupération de tous les workspaces pour mise à jour de l'affichage
			const allWorkspaces: Workspace[] = await api.getWorkspaces()

			setLastSaved(allWorkspaces)
			console.log("Données récupérées du JSON :", allWorkspaces)

		} catch (error) {
			console.error("Erreur de communication :", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Box p="10" minH="100vh" bg="gray.50">
			<VStack align="start" gap="5">
				<Heading size="3xl" color="blue.600">
					🚀 Workset Debug Mode
				</Heading>

				<Text fontSize="lg" color="gray.700">
					Test de communication avec <b>Typage Fort</b>.
				</Text>

				<Button
					colorPalette="blue"
					variant="solid"
					size="lg"
					onClick={handleTestCommunication}
					loading={loading}
				>
					Tester la connexion au Main
				</Button>

				{lastSaved && (
					<Box mt="8" p="6" bg="white" border="1px solid" borderColor="gray.200" borderRadius="xl" shadow="sm" w="full">
						<Text fontWeight="bold" mb="2" color="green.600">
							✅ Succès ! Structure respectée dans le JSON :
						</Text>
						<Code
							display="block"
							whiteSpace="pre"
							p="4"
							borderRadius="md"
						>
							{JSON.stringify(lastSaved, null, 2)}
						</Code>
					</Box>
				)}
			</VStack>
		</Box>
	)
}

export default App