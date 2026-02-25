import { cloudflare } from '@cloudflare/vite-plugin'
import contentCollections from '@content-collections/vite'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    contentCollections(),
    // https://tanstack.com/start/latest/docs/framework/react/guide/hosting
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart({
      prerender: {
        enabled: true,
        autoStaticPathsDiscovery: true,
        crawlLinks: true,
        retryCount: 2,
        failOnError: true
      }
    }),
    viteReact(),
    tailwindcss()
  ],
  optimizeDeps: {
    exclude: ['@mapbox']
  }
})

export default config
