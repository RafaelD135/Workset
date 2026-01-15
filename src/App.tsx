import "./App.css";

import { invoke } from '@tauri-apps/api/core';

import { Button } from "@chakra-ui/react"

function App() {
	const tasks = [
		{
			name: "Lancer Projet Web",
			config: {
				type: "Internet",
				params: {
					url: "https://youtube.com"
				}
			}
		},
		{
			name: "Ouvrir VSCode", config: {
				type: "VsCode",
				params: {
					path: "C:/Users/debei/Workset/src-tauri"
				}
			}
		},
		{
			name: "Ouvrir Terminal", config: {
				type: "Terminal",
				params: {
					path: "C:/Users/debei/Workset/src-tauri",
					command: "ls"
				}
			}
		},
		{
			name: "Ouvrir Explorateur de fichiers", config: {
				type: "FileExplorer",
				params: {
					path: "C:/Users/debei/Workset/src-tauri",
				}
			}
		}
	];

	return (
		<div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '20px' }}>
			{tasks.map(task => (
				<Button key={task.name} onClick={async () => {
					await invoke('launch_task', { task });
				}}>
					{task.name}
			</Button>
			))}
		</div>
	);
}

export default App;
