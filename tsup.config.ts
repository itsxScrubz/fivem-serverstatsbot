import { defineConfig } from 'tsup';

const isDev = process.argv[2] === '--watch';

export default defineConfig({
	entry: ['./src/index.ts'],
	outDir: 'bin',
	target: 'esnext',
	format: 'esm',
	clean: true,
	minify: true,
	dts: false,
	sourcemap: false,
	metafile: false,
	silent: isDev,
	onSuccess: isDev ? 'ISDEV=true node bin/index.js' : undefined,
});
