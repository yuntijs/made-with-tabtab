import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: '@yuntijs/made-with-tabtab',
      formats: ['umd'],
      fileName: (format) => `@yuntijs/made-with-tabtab.${format}.js`
    }
  },
})
