import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default defineConfig(({ command }) => {
  const isBuild = command === 'build'

  return {
    plugins: [vue()],
    server: {
      host: 'localhost',
      port: 5173,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/assets/_variable.scss";`,
        },
      },
    },
    base: isBuild ? '/vueFlix/' : '/',
  }
})
