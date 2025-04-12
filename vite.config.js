import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: "autoUpdate",
        devOptions: {
            enabled: false //Re-enable later
        },
        manifest: {
            name: "GamePortal - Un portale nel mondo dei videogiochi",
            short_name: "GamePortal",
            description: "Un portale nel mondo dei videogiochi",
            start_url: "/",
            display: "standalone",
            background_color: "#262626",
            theme_color: "#12bee6",
            icons: [
                {
                    src: "/icon-192x192.png",
                    sizes: "192x192",
                    type: "image/png",
                },
                {
                    src: "/icon-512x512.png",
                    sizes: "512x512",
                    type: "image/png",
                },
            ],
        },
    }),
    ],
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
            '/steamCommunity': {
                target: "https://steamcommunity.com/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/steamCommunity/, '')
            },
            '/partnerSteam': {
                target: "https://partner.steam-api.com/",
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/partnerSteam/, '')
            },
            '/rawg': {
                target: 'https://api.rawg.io/api',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/rawg/, '')
            }
        }
    }
})
