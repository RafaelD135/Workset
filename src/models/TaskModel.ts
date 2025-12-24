import { type TaskType } from './TaskTypeModel';

// Interface pour une tâche individuelle
export interface Task {
	id     : string  ; // UUID
	type   : TaskType; // Type de tâche
	label  : string  ; // Titre affiché
	value? : string  ; // Commande, URL ou Chemin de fichier (optionnel)
	path?  : string  ; // Dossier de travail (optionnel)
}