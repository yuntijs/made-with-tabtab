import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'MadeWithTabTab',
      formats: ['umd'],
      fileName: (format) => `made-with-tabtab.${format}.js`
    }
  },
})
