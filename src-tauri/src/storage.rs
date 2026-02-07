use std::fs;
use std::path::PathBuf;
use crate::models::{AutomatedTask, TaskConfig, Workspace};
use tauri::AppHandle;
use tauri::Manager;
use uuid::Uuid;

fn get_storage_path(app_handle: &AppHandle) -> PathBuf {
    app_handle.path().app_config_dir()
        .expect("Impossible de trouver le dossier de config")
        .join("tasks.json")
}

fn get_default_tasks() -> Vec<AutomatedTask> {
    vec![
        AutomatedTask {
            id: "1".into(),
            name: "Lancer Projet Web".into(),
            config: TaskConfig::Internet { url: "https://youtube.com".into() },
        },
        AutomatedTask {
            id: "2".into(),
            name: "Ouvrir VSCode".into(),
            config: TaskConfig::VsCode { path: "C:/Users/debei/Workset/src-tauri".into() },
        },
    ]
}

#[tauri::command]
pub fn load_tasks(app_handle: AppHandle) -> Result<Vec<AutomatedTask>, String> {
    let path = get_storage_path(&app_handle);
    if !path.exists() {
        let default_tasks = get_default_tasks();
        let _ = save_tasks(app_handle, default_tasks.clone());
        return Ok(default_tasks);
    }
    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let tasks: Vec<AutomatedTask> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(tasks)
}

#[tauri::command]
pub fn create_task(app_handle: AppHandle, name: String, config: TaskConfig) -> Result<(), String> {
    let mut tasks = load_tasks(app_handle.clone())?;
    
    let new_task = AutomatedTask {
        id: Uuid::new_v4().to_string(), // Génération de l'ID unique
        name,
        config,
    };

    tasks.push(new_task);
    save_tasks(app_handle, tasks)
}

#[tauri::command]
pub fn save_tasks(app_handle: AppHandle, tasks: Vec<AutomatedTask>) -> Result<(), String> {
    let path = get_storage_path(&app_handle);
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(&tasks).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(())
}

fn get_default_workspaces() -> Vec<Workspace> {
    vec![
        Workspace {
            id: "default".into(),
            name: "Workspace par défaut".into(),
            tasks: vec!["1".into(), "2".into()],
        },
    ]
}

#[tauri::command]
pub fn load_workspaces(app_handle: AppHandle) -> Result<Vec<Workspace>, String> {
    let path = app_handle.path().app_config_dir().unwrap().join("workspaces.json");
    if !path.exists() {
        let default = get_default_workspaces();
        let _ = save_workspaces(app_handle, default.clone());
        return Ok(default);
    }
    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let workspaces: Vec<Workspace> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(workspaces)
}

#[tauri::command]
pub fn save_workspaces(app_handle: AppHandle, workspaces: Vec<Workspace>) -> Result<(), String> {
    let path = app_handle.path().app_config_dir().unwrap().join("workspaces.json");
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(&workspaces).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(())
}