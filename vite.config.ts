import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'

export default defineConfig({
  base: './',
  plugins: [
    react(),
    electron([
      {
        // Point d'entrée du processus Main
        entry: 'electron/main.ts',
      },
    ]),
    renderer(),
  ],
})