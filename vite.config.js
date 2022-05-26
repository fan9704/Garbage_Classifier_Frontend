import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from '@vuetify/vite-plugin'

const path = require('path')

// https://vitejs.dev/config/
export default defineConfig({
    base: path.resolve(__dirname, './dist/'),
    plugins: [
        vue(),
        // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
        vuetify({
            autoImport: true,
        }),
    ],
    define: { 'process.env': {} },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    server: {
        proxy: {
            // 選項寫法
            '/api': {
                target: 'http://140.125.207.230:8080',
                changeOrigin: true,
                rewrite: (path) => path.replace('', '')
            },
        }
    }
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