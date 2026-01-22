use crate::models::{AutomatedTask, TaskConfig, Workspace};

use std::process::Command;

use tauri::AppHandle;
use tauri::Manager;

use webbrowser;

#[tauri::command]
pub fn launch_task(task: AutomatedTask) -> Result<(), String> {
    match task.config {
        TaskConfig::Internet { url } => {
            webbrowser::open(&url).map_err(|e| e.to_string())?;
        },
		TaskConfig::VsCode { path } => {
			#[cfg(target_os = "windows")]
			{
				Command::new("cmd")
					.args(["/C", "code", &path.to_string_lossy()])
					.spawn()
					.map_err(|e| format!("Erreur VSCode (Windows) : {}", e))?;
			}
		},
		TaskConfig::Terminal { path, command } => {
			let mut cmd = Command::new("wt");

			if let Some(path) = path {
				cmd.args([
					"new-tab",
					"--startingDirectory",
					path.to_str().ok_or("Chemin invalide")?,
					"powershell",
					"-NoExit",
				]);
			} else {
				cmd.args([
					"new-tab",
					"powershell",
					"-NoExit",
				]);
			}

			if let Some(command) = command {
				if !command.trim().is_empty() {
					cmd.args([
						"-Command",
						&command,
					]);
				}
			}

			cmd.spawn()
				.map_err(|e| format!("Erreur Terminal : {}", e))?;
		},
        TaskConfig::FileExplorer { path } => {
            Command::new("explorer")
                .arg(path)
                .spawn()
                .map_err(|e| e.to_string())?;
        }
    }
    Ok(())
}

pub fn get_task_by_id(app_handle: &AppHandle, id: u64) -> Result<AutomatedTask, String> {
    // 1. Définir le chemin du fichier tasks.json
    let path = app_handle
        .path()
        .app_config_dir()
        .map_err(|e| e.to_string())?
        .join("tasks.json");

    // 2. Lire le fichier
    let data = std::fs::read_to_string(path)
        .map_err(|_| "Impossible de lire le fichier des tâches".to_string())?;

    // 3. Désérialiser la liste
    let tasks: Vec<AutomatedTask> = serde_json::from_str(&data)
        .map_err(|e| format!("Erreur JSON : {}", e))?;

    // 4. Trouver la tâche
    tasks.into_iter()
        .find(|t| t.id == id)
        .ok_or_else(|| format!("Tâche avec l'ID {} introuvable", id))
}

#[tauri::command]
pub fn launch_workspace(app_handle: tauri::AppHandle, workspace: Workspace) -> Result<(), String> {
    for task_id in workspace.tasks {
        // On récupère la tâche dynamiquement par son ID
        match get_task_by_id(&app_handle, task_id) {
            Ok(task) => {
                // On appelle ta fonction launch_task existante
                launch_task(task)?;
            },
            Err(e) => {
                // On log l'erreur mais on continue pour ne pas bloquer les autres tâches
                eprintln!("Avertissement : {}", e);
            }
        }
    }
    Ok(())
}