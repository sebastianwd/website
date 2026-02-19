import { cloudflare } from '@cloudflare/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import mdx from 'fumadocs-mdx/vite'
import { defineConfig } from 'vite'

import * as MdxConfig from './source.config'

const config = defineConfig({
  resolve: {
    tsconfigPaths: true
  },
  plugins: [
    mdx(MdxConfig),
    // https://tanstack.com/start/latest/docs/framework/react/guide/hosting
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    tanstackStart(),
    viteReact(),
    tailwindcss()
  ],
  optimizeDeps: {
    exclude: ['@mapbox']
  }
})

export default config
