import { defineConfig, globalIgnores } from 'eslint/config'
import tsParser from '@typescript-eslint/parser'
import nextConfig from 'eslint-config-next/core-web-vitals'

export default defineConfig([
  globalIgnores(['**/coverage/', '**/next.config.js']),
  ...nextConfig,
  // Override the Next.js Babel parser with @typescript-eslint/parser, which
  // implements the scopeManager.addGlobals API required by ESLint 10.
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx,mts,cts}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      // Flags valid patterns (e.g. setState inside useEffect on mount).
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
