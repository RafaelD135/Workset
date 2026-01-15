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
    pub name: String,
    pub config: TaskConfig,
}