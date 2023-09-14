import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    // base 的寫法：
    // base: '/Repository 的名稱/'
    base: '/Exhibition-app/',
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },
    server: {
        // 啟動 server 時預設開啟的頁面
        // open: '/'
    },
    build: {
        outDir: 'dist'
    },
    css: {
        // preprocessorOptions: {
        //     scss: {
        //         additionalData: '@import "@/assets/scss/abstracts/__abstracts-dir.scss";'
        //     }
        // }
    }
})
