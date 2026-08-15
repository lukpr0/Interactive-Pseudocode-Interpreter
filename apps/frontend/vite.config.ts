/// <reference types="vitest/config" />
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

import interpreterVersion from '@interactive-pseudo/interpreter/package.json' with { type: 'json' }
import parserVersion from '@interactive-pseudo/parser/package.json' with { type: 'json' }
import frontendVersion from '@interactive-pseudo/frontend/package.json' with { type: 'json' }

export default defineConfig({

	build: {
		assetsInlineLimit: Infinity
	},

	plugins: [sveltekit()],

	test: {
		include: ["./test/**/*.{test,spec}.{js,ts}"],
        exclude: ['**/node_modules', '**/dist'],
	},

	define: {
		__INTERPRETER_VERSION__: JSON.stringify(interpreterVersion.version),
		__PARSER_VERSION__: JSON.stringify(parserVersion.version),
		__FRONTEND_VERSION__: JSON.stringify(frontendVersion.version)
	}
});
