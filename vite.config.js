import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: "./", // ✅ ensures assets load correctly on Netlify
  build: {
    outDir: "dist",              // Netlify expects dist
    chunkSizeWarningLimit: 1000, // silence big bundle warning (optional)
  },
  server: {
    port: 5173, // local dev port
    open: true, // auto-open browser
  },
})
