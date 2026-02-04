import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    // https://tanstack.com/start/latest/docs/framework/react/guide/hosting
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    viteReact(),
    tanstackStart(),
    tailwindcss()
  ],
  optimizeDeps: {
    exclude: ['@mapbox']
  }
})

export default config
