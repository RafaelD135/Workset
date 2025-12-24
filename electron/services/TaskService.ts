import store from '../store';
import { type Task } from '../../src/models/TaskModel';

export class TaskService {
	// Ajoute une tâche à un workspace donné
	static addTask(workspaceId: string, task: Task): void {
		const workspaces = store.get('workspaces');
		const wsIndex = workspaces.findIndex(w => w.id === workspaceId);

		if (wsIndex > -1) {
			workspaces[wsIndex].tasks.push(task);
			store.set('workspaces', workspaces);
		}
	}

	// Supprime une tâche d'un workspace donné
	static deleteTask(workspaceId: string, taskId: string): void {
		const workspaces = store.get('workspaces');
		const wsIndex = workspaces.findIndex(w => w.id === workspaceId);

		if (wsIndex > -1) {
			workspaces[wsIndex].tasks = workspaces[wsIndex].tasks.filter(t => t.id !== taskId);
			store.set('workspaces', workspaces);
		}
	}

	// Met à jour une tâche dans un workspace donné
	static updateTask(workspaceId: string, updatedTask: Task): void {
		const workspaces = store.get('workspaces');
		const wsIndex = workspaces.findIndex(w => w.id === workspaceId);

		if (wsIndex > -1) {
			const taskIndex = workspaces[wsIndex].tasks.findIndex(t => t.id === updatedTask.id);

			if (taskIndex > -1) {
				workspaces[wsIndex].tasks[taskIndex] = updatedTask;
				store.set('workspaces', workspaces);
			}
		}
	}
}