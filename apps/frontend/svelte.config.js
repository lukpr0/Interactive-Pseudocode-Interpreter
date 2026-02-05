import adapter from '@sveltejs/adapter-static';
import { mdsvex } from "mdsvex"
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: [mdsvex({extensions: ['.md']}), vitePreprocess()],
	extensions: [".svelte", ".md"],

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(),
		paths: {
			base: process.argv.includes('dev') ? '' : process.env.BASE_PATH
		},
		output: {
			bundleStrategy: 'inline',
		},

		router: {
			type: 'hash'
		}
	}
};

export default config;
