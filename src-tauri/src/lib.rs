// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
mod models;
mod commands;
mod storage;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            commands::launch_task,
            storage::load_tasks,
            storage::save_tasks,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
