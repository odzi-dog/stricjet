const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/login/index.svelte"),
	() => import("../../../src/routes/app/__layout.svelte"),
	() => import("../../../src/routes/app/index.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/login/index.svelte
	[/^\/login\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/app/index.svelte
	[/^\/app\/?$/, [c[0], c[4], c[5]], [c[1]]]
];

export const fallback = [c[0](), c[1]()];