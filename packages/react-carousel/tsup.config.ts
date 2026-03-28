import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    tsconfig: 'tsconfig.lib.json',
    compilerOptions: {
      composite: false,
    },
  },
  injectStyle: true,
  clean: true,
  external: ['react', 'react-dom'],
});
