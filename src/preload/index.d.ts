import { } from 'electron'

declare global {
	interface Window {
		api: {
			getWorkspaces: () => Promise<any[]>
			saveWorkspace: (ws: any) => Promise<void>
			deleteWorkspace: (id: string) => Promise<void>
			addTask: (wsId: string, task: any) => Promise<void>
			updateTask: (wsId: string, task: any) => Promise<void>
			deleteTask: (wsId: string, taskId: string) => Promise<void>
		}
	}
}