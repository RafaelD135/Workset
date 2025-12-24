import { type Workspace } from './WorkspaceModel';

// Structure globale du stockage pour electron-store
export interface StoreSchema {
	workspaces: Workspace[];
	settings: {
		language: 'fr' | 'en';
		theme: 'light' | 'dark' | 'system';
	};
}
