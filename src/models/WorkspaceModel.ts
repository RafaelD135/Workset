import { type Task } from './TaskModel';

// Interface pour un Workspace
export interface Workspace {
	id            : string; // UUID
	name          : string; // Nom du workspace
	description?  : string; // Description (optionnel)
	tasks         : Task[]; // Liste des tâches associées
	createdAt     : number; // Timestamp de création
}