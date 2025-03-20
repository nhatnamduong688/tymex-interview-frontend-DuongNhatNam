import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

const path = require('path')

const __dirname = new URL('.', import.meta.url).pathname

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
})