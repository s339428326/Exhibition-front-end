import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import mkcert from 'vite-plugin-mkcert'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // base: '/Repository 的名稱/'
    base: '/Exhibition-front-end/',
    plugins: [vue(), mkcert()], //,
    resolve: {
        alias: {
            '~': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        // 啟動 server 時預設開啟的頁面
        // open: '/',
        // https: true,
        // host: '192.168.0.12', //RWD 同網域下可以連線設定
        // port: 5173
    },
    build: {
        outDir: 'dist',
        chunkSizeWarningLimit: 1500
    }
})
