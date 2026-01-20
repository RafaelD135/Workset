use std::fs;
use std::path::PathBuf;

use crate::models::{AutomatedTask, TaskConfig, Workspace}; // Importation des modèles

use tauri::AppHandle;
use tauri::Manager;

fn get_storage_path(app_handle: &AppHandle) -> PathBuf {
    app_handle.path().app_config_dir()
        .expect("Impossible de trouver le dossier de config")
        .join("tasks.json")
}

// Fonction pour générer tes tâches par défaut
fn get_default_tasks() -> Vec<AutomatedTask> {
    vec![
        AutomatedTask {
            id: 1,
            name: "Lancer Projet Web".into(),
            config: TaskConfig::Internet { url: "https://youtube.com".into() },
        },
        AutomatedTask {
            id: 2,
            name: "Ouvrir VSCode".into(),
            config: TaskConfig::VsCode { path: "C:/Users/debei/Workset/src-tauri".into() },
        },
        AutomatedTask {
            id: 3,
            name: "Ouvrir Terminal".into(),
            config: TaskConfig::Terminal { 
                path: Some("C:/Users/debei/Workset/src-tauri".into()), 
                command: Some("ls".into()) 
            },
        },
        AutomatedTask {
            id: 4,
            name: "Ouvrir Explorateur de fichiers".into(),
            config: TaskConfig::FileExplorer { path: "C:/Users/debei/Workset/src-tauri".into() },
        },
    ]
}

#[tauri::command]
pub fn load_tasks(app_handle: AppHandle) -> Result<Vec<AutomatedTask>, String> {
    let path = get_storage_path(&app_handle);
    
    if !path.exists() {
        // PREMIER LANCEMENT :
        let default_tasks = get_default_tasks();
        
        // Optionnel : Sauvegarder immédiatement pour que le fichier existe
        let _ = save_tasks(app_handle, default_tasks.clone());
        
        return Ok(default_tasks);
    }

    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let tasks: Vec<AutomatedTask> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(tasks)
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

// Fonction pour générer tes workspaces par défaut
fn get_default_workspaces() -> Vec<Workspace> {
    vec![
        Workspace {
            id: 1,
            name: "Workspace par défaut".into(),
            tasks: vec![1, 2, 3, 4],
        },
    ]
}

#[tauri::command]
pub fn load_workspaces(app_handle: AppHandle) -> Result<Vec<Workspace>, String> {
    let path = app_handle.path().app_config_dir()
        .expect("Impossible de trouver le dossier de config")
        .join("workspaces.json");
    
    if !path.exists() {
        // PREMIER LANCEMENT :
        let default_workspaces = get_default_workspaces();
        
        // Optionnel : Sauvegarder immédiatement pour que le fichier existe
        let _ = save_workspaces(app_handle, default_workspaces.clone());
        
        return Ok(default_workspaces);
    }

    let data = fs::read_to_string(path).map_err(|e| e.to_string())?;
    let workspaces: Vec<Workspace> = serde_json::from_str(&data).map_err(|e| e.to_string())?;
    Ok(workspaces)
}

#[tauri::command]
pub fn save_workspaces(app_handle: AppHandle, workspaces: Vec<Workspace>) -> Result<(), String> {
    let path = app_handle.path().app_config_dir()
        .expect("Impossible de trouver le dossier de config")
        .join("workspaces.json");
    if let Some(parent) = path.parent() {
        fs::create_dir_all(parent).map_err(|e| e.to_string())?;
    }
    let json = serde_json::to_string_pretty(&workspaces).map_err(|e| e.to_string())?;
    fs::write(path, json).map_err(|e| e.to_string())?;
    Ok(())
}