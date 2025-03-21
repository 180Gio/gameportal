import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/steam': {
                target: 'https://api.steampowered.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/steam/, '')
            },
            '/store': {
                target: "https://store.steampowered.com/api",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/store/, '')
            },
            '/rawg': {
                target: 'https://api.rawg.io/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/rawg/, '')
            }
        }
    }
})
