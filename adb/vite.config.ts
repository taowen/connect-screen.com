import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/static/adb/',
  build: {
    outDir: '../public/static/'
  },
  publicDir: 'public'
}) 