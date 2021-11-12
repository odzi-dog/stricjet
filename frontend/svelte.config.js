import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';
import { resolve } from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],

	kit: {
		// hydrate the <div id="svelte"> element in src/app.html
		adapter: adapter(),
		target: '#svelte',
    vite: {
      resolve: {
        alias: {
          src: resolve('./src'),
          '@app/shared': resolve('../backend/libs/shared/src'),
        },
      },
    },
	}
};

export default config;
