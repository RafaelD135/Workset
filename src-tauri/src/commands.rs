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
            Command::new("cmd")
                .args(["/C", "code", &path.to_string_lossy()])
                .spawn()
                .map_err(|e| format!("Erreur VSCode : {}", e))?;
        },
        TaskConfig::Terminal { path, command } => {
            let mut cmd = Command::new("wt");
            let mut args = vec!["new-tab".to_string()];
            
            if let Some(p) = path {
                args.push("--startingDirectory".to_string());
                args.push(p.to_string_lossy().into_owned());
            }
            
            args.push("powershell".to_string());
            args.push("-NoExit".to_string());

            if let Some(c) = command {
                if !c.trim().is_empty() {
                    args.push("-Command".to_string());
                    args.push(c);
                }
            }

            cmd.args(args).spawn().map_err(|e| e.to_string())?;
        },
        TaskConfig::FileExplorer { path } => {
            Command::new("explorer").arg(path).spawn().map_err(|e| e.to_string())?;
        }
    }
    Ok(())
}

pub fn get_task_by_id(app_handle: &AppHandle, id: String) -> Result<AutomatedTask, String> {
    let path = app_handle.path().app_config_dir().unwrap().join("tasks.json");
    let data = std::fs::read_to_string(path).map_err(|_| "Erreur lecture".to_string())?;
    let tasks: Vec<AutomatedTask> = serde_json::from_str(&data).map_err(|e| e.to_string())?;

    tasks.into_iter()
        .find(|t| t.id == id)
        .ok_or_else(|| format!("ID {} introuvable", id))
}

#[tauri::command]
pub fn launch_workspace(app_handle: tauri::AppHandle, workspace: Workspace) -> Result<(), String> {
    for task_id in workspace.tasks {
        if let Ok(task) = get_task_by_id(&app_handle, task_id) {
            launch_task(task)?;
        }
    }
    Ok(())
}