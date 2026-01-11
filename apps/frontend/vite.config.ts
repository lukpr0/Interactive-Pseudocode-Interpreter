/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
export default defineConfig({

	build: {
		assetsInlineLimit: Infinity
	},

	plugins: [sveltekit()],

	test: {
		include: ["./test/**/*.{test,spec}.{js,ts}"],
        exclude: ['**/node_modules', '**/dist'],
	}
});
