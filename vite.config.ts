import { defineConfig } from 'vite'
import { resolve } from 'path'
import react from '@vitejs/plugin-react'
import electron from 'vite-plugin-electron/simple'

export default defineConfig({
	base: './',
	root: 'src/renderer',
	plugins: [
		react(),
		electron({
			main: {
				entry: resolve(__dirname, 'electron/main.ts'),
			},
			preload: {
				input: resolve(__dirname, 'electron/preload.ts'),
			},
		}),
	],
})