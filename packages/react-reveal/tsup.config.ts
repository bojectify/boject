import { defineConfig } from 'tsup';
import { vanillaExtractPlugin } from '@vanilla-extract/esbuild-plugin';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: {
    tsconfig: 'tsconfig.lib.json',
    compilerOptions: {
      composite: false,
    },
  },
  esbuildPlugins: [vanillaExtractPlugin()],
  clean: true,
  external: ['react', 'react-dom'],
});
