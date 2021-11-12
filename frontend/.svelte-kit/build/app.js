import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.png\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":"/."} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: "/./_app/start-f0fb1ec8.js",
			css: ["/./_app/assets/start-0826e215.css"],
			js: ["/./_app/start-f0fb1ec8.js","/./_app/chunks/vendor-223db38c.js","/./_app/chunks/singletons-bb9012b7.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => "/./_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: error => {
			console.error(error.stack);
			error.stack = options.get_stack(error);
		},
		hooks: get_hooks(user_hooks),
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

const d = decodeURIComponent;
const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.png","size":1571,"type":"image/png"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/login\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/login/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/app\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/app/__layout.svelte", "src/routes/app/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	serverFetch: hooks.serverFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/login/index.svelte": () => import("../../src/routes/login/index.svelte"),"src/routes/app/__layout.svelte": () => import("../../src/routes/app/__layout.svelte"),"src/routes/app/index.svelte": () => import("../../src/routes/app/index.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"/./_app/pages/__layout.svelte-36b4f0b8.js","css":["/./_app/assets/pages/__layout.svelte-53ebd292.css"],"js":["/./_app/pages/__layout.svelte-36b4f0b8.js","/./_app/chunks/vendor-223db38c.js"],"styles":null},".svelte-kit/build/components/error.svelte":{"entry":"/./_app/error.svelte-493c410b.js","css":[],"js":["/./_app/error.svelte-493c410b.js","/./_app/chunks/vendor-223db38c.js"],"styles":null},"src/routes/index.svelte":{"entry":"/./_app/pages/index.svelte-0f8aa3e3.js","css":[],"js":["/./_app/pages/index.svelte-0f8aa3e3.js","/./_app/chunks/vendor-223db38c.js"],"styles":null},"src/routes/login/index.svelte":{"entry":"/./_app/pages/login/index.svelte-647947c6.js","css":[],"js":["/./_app/pages/login/index.svelte-647947c6.js","/./_app/chunks/vendor-223db38c.js","/./_app/chunks/CurrentProfile.store-573153db.js","/./_app/chunks/singletons-bb9012b7.js"],"styles":null},"src/routes/app/__layout.svelte":{"entry":"/./_app/pages/app/__layout.svelte-449198f5.js","css":[],"js":["/./_app/pages/app/__layout.svelte-449198f5.js","/./_app/chunks/vendor-223db38c.js","/./_app/chunks/CurrentProfile.store-573153db.js","/./_app/chunks/singletons-bb9012b7.js"],"styles":null},"src/routes/app/index.svelte":{"entry":"/./_app/pages/app/index.svelte-159ec206.js","css":[],"js":["/./_app/pages/app/index.svelte-159ec206.js","/./_app/chunks/vendor-223db38c.js"],"styles":null}};

async function load_component(file) {
	return {
		module: await module_lookup[file](),
		...metadata_lookup[file]
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}