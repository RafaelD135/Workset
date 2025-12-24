import { contextBridge, ipcRenderer } from 'electron'
import { type Workspace } from '../src/models/WorkspaceModel'
import { type Task } from '../src/models/TaskModel';

contextBridge.exposeInMainWorld('api', {
	// Workspaces
	getWorkspaces: () => ipcRenderer.invoke('get-workspaces'),
	saveWorkspace: (ws : Workspace) => ipcRenderer.invoke('save-workspace', ws),
	deleteWorkspace: (id: string) => ipcRenderer.invoke('delete-workspace', id),
	// Tasks
	addTask: (wsId: string, task: Task) => ipcRenderer.invoke('add-task', wsId, task),
	updateTask: (wsId: string, task : Task) => ipcRenderer.invoke('update-task', wsId, task),
	deleteTask: (wsId: string, taskId: string) => ipcRenderer.invoke('delete-task', wsId, taskId)
})