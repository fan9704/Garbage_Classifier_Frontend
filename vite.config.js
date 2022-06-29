import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'
// import { VitePWA } from 'vite-plugin-pwa'
// import electron from 'vite-plugin-electron'
// import { join } from 'path'
/*
-dev
        "electron": "^19.0.3",
        "vite-plugin-electron": "^0.6.0",
        "electron-builder": "^23.0.3",
        "workbox-precaching": "^6.2.2"
 */
const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    // base: path.resolve(__dirname, './dist/'),
    plugins: [
        vue(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
        // VitePWA({
        //     mode: "development",
        //     base: "/",
        //     srcDir: "src",
        //     filename: "sw.js",
        //     includeAssets: ["/favicon.png"],
        //     strategies: "injectManifest",
        //     manifest: {
        //         name: "Garbage Classifier",
        //         short_name: "GCF",
        //         theme_color: "#ffffff",
        //         start_url: "/",
        //         display: "standalone",
        //         background_color: "#ffffff",
        //         icons: [
        //             {
        //                 src: "pwa-192x192.png",
        //                 sizes: "192x192",
        //                 type: "image/png",
        //             },
        //             // {
        //             //     src: "/icon-512.png",
        //             //     sizes: "512x512",
        //             //     type: "image/png",
        //             // },
        //             // {
        //             //     src: "icon-512.png",
        //             //     sizes: "512x512",
        //             //     type: "image/png",
        //             //     purpose: "any maskable",
        //             // },
        //         ],
        //         workbox: {
        //             cleanupOutdatedCaches: true,
        //             sourcemap: true
        //         }
        //     }
        // }),
        // electron({
        //     main: {
        //         entry: 'electron/main/index.js',
        //         vite: {
        //             build: {
        //                 sourcemap: false,
        //                 outDir: 'dist/electron/main',
        //             },
        //         },
        //     },
        //     preload: {
        //         input: {
        //             // You can configure multiple preload here
        //             splash: join(__dirname, 'electron/preload/splash.js'),
        //         },
        //         vite: {
        //             build: {
        //                 // For debug
        //                 sourcemap: 'inline',
        //                 outDir: 'dist/electron/preload',
        //             }
        //         }
        //     },
        //     // Enables use of Node.js API in the Renderer-process
        //     renderer: {},
        // }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
            'vue$': 'vue/dist/vue.esm.js',
            'static': path.resolve(__dirname, '../static'),
            '/images':'src/assets/images',
        },
    },
    server: {
        proxy: {
            // 選項寫法
            '/api': {
                target: 'https://www.lab-fan9704.eu.org',
                // target: 'http://127.0.0.1:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace('', '')
            },
        }
    },

    /* remove the need to specify .vue files https://vitejs.dev/config/#resolve-extensions
    resolve: {
      extensions: [
        '.js',
        '.json',
        '.jsx',
        '.mjs',
        '.ts',
        '.tsx',
        '.vue',
      ]
    },
    */
})