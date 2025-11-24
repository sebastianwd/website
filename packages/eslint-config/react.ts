import { defineConfig } from 'eslint/config'
import swdEslintPlugin from 'swd-eslint-config'

export default defineConfig(...swdEslintPlugin.configs.base, ...swdEslintPlugin.configs.react())
