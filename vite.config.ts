import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@features': path.resolve(__dirname, './src/features'),
            '@core': path.resolve(__dirname, './src/core'),
            '@shared': path.resolve(__dirname, './src/shared'),
        }
    },
    css: {
        modules: {
            localsConvention: 'camelCase',
            generateScopedName: '[name]__[local]___[hash:base64:5]',
        },
        preprocessorOptions: {
            scss: {
                // Thêm options cho scss nếu cần thiết
                additionalData: `$injectedColor: orange;`
            }
        }
    }
})