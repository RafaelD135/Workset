import { ipcMain } from 'electron'
import { WorkspaceService } from './services/WorkspaceService'
import { TaskService } from './services/TaskService'

export function registerIpcHandlers() {
	// Gestion des Workspaces
	ipcMain.handle('get-workspaces', () => {
		return WorkspaceService.getAll()
	})

	ipcMain.handle('save-workspace', (_event, ws) => {
		WorkspaceService.save(ws)
	})

	ipcMain.handle('delete-workspace', (_event, id) => {
		WorkspaceService.delete(id)
	})

	// Gestion des Tasks
	ipcMain.handle('add-task', (_event, wsId, task) => {
		TaskService.addTask(wsId, task)
	})

	ipcMain.handle('update-task', (_event, wsId, task) => {
		TaskService.updateTask(wsId, task)
	})

	ipcMain.handle('delete-task', (_event, wsId, taskId) => {
		TaskService.deleteTask(wsId, taskId)
	})
}