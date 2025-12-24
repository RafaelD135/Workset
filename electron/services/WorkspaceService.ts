import store from '../store';
import { type Workspace } from '../../src/models/WorkspaceModel';

export class WorkspaceService {
	// Retourne tous les workspaces
	static getAll(): Workspace[] {
		return store.get('workspaces');
	}

	// Sauvegarde ou met à jour un workspace
	static save(workspace: Workspace): void {
		const workspaces = store.get('workspaces');
		const index = workspaces.findIndex((w: Workspace) => w.id === workspace.id);

		if (index > -1) {
			workspaces[index] = workspace;
		} else {
			workspaces.push(workspace);
		}
		store.set('workspaces', workspaces);
	}

	// Supprime un workspace par son ID
	static delete(id: string): void {
		const workspaces = store.get('workspaces').filter((w: Workspace) => w.id !== id);
		store.set('workspaces', workspaces);
	}
}