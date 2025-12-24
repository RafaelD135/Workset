// electron/main.ts
import { app, BrowserWindow } from 'electron'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { registerIpcHandlers } from './ipcHandlers' // Importe nos handlers

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function createWindow() {
	const win = new BrowserWindow({
		width: 1200,
		height: 800,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.join(__dirname, 'preload.mjs'),
		},
	})

	if (process.env.VITE_DEV_SERVER_URL) {
		win.loadURL(process.env.VITE_DEV_SERVER_URL)
	} else {
		win.loadFile(path.join(__dirname, '../dist/index.html'))
	}
}

app.whenReady().then(() => {
	registerIpcHandlers() // ON ACTIVE LES SERVICES ICI
	createWindow()
})