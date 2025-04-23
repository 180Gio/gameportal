import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import {VitePWA} from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), VitePWA({
        registerType: "autoUpdate",
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
            lang: "it-IT",
            orientation: "portrait",
            screenshots: [
                {
                    src: "/screenshot-wide.png",
                    sizes: "1280x720",
                    type: "image/png",
                    form_factor: "wide"
                },
                {
                    src: "/screenshot-mobile.png",
                    sizes: "720x1280",
                    type: "image/png"
                },
                {
                    "src": "/maskable-icon.png",
                    "sizes": "512x512",
                    "type": "image/png",
                    "purpose": "maskable"
                }
            ]
        },
        workbox: {
            runtimeCaching: [
                {
                    urlPattern: ({request}) => request.destination === "document",
                    handler: "NetworkFirst",
                    options: {
                        cacheName: "document-cache",
                        expiration: {
                            maxEntries: 20,
                            maxAgeSeconds: 60 * 60 * 8,
                        },
                        networkTimeoutSeconds: 5
                    }
                },
                {
                    urlPattern: ({request}) => request.destination === "style"
                        || request.destination === "script" || request.destination === "worker",
                    handler: "CacheFirst",
                    options: {
                        cacheName: "static-cache",
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 60 * 24,
                        }
                    }
                },
                {
                    urlPattern: ({url}) => url.pathname.startsWith("/steam")
                        || url.pathname.startsWith("/store") || url.pathname.startsWith("/steamCommunity")
                        || url.pathname.startsWith("/partnerSteam"),
                    handler: "StaleWhileRevalidate",
                    options: {
                        cacheName: "steam-cache",
                        expiration: {
                            maxEntries: 3000,
                            maxAgeSeconds: 60 * 5,
                        }
                    }
                },
                {
                    urlPattern: ({url}) => url.pathname.startsWith("/rawg"),
                    handler: "StaleWhileRevalidate",
                    options: {
                        cacheName: "rawg-cache",
                        expiration: {
                            maxEntries: 50,
                            maxAgeSeconds: 60 * 5,
                        }
                    }
                }
            ]
        }
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
