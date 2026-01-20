use crate::models::{AutomatedTask, TaskConfig, Workspace};

use std::process::Command;

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

#[tauri::command]
pub fn launch_workspace(workspace: Workspace, all_tasks: Vec<AutomatedTask>) -> Result<(), String> {
    for task_id in workspace.tasks {
        if let Some(task) = all_tasks.iter().find(|t| t.id == task_id) {
            launch_task(task.clone())?;
        } else {
            println!("Avertissement : La tâche avec l'ID {} n'a pas été trouvée.", task_id);
        }
    }
    Ok(())
}