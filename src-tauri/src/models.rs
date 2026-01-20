use serde::{Serialize, Deserialize};
use std::path::PathBuf;

#[derive(Serialize, Deserialize, Debug, Clone)]
#[serde(tag = "type", content = "params")]
pub enum TaskConfig {
    Terminal { path: Option<PathBuf>, command: Option<String> },
    Internet { url: String },
    FileExplorer { path: PathBuf },
    VsCode { path: PathBuf },
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct AutomatedTask {
    pub id: u32,
    pub name: String,
    pub config: TaskConfig,
}

#[derive(Serialize, Deserialize, Debug, Clone)]
pub struct Workspace {
    pub id: u32,
    pub name: String,
    pub tasks: Vec<u32>,
}