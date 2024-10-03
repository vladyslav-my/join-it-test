import { readFileSync } from "fs";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => {
	const plugins = [
		visualizer(),
		react(),
		svgr(),
	];

	return {
		server: {
			host: "0.0.0.0",
		},
		plugins,
		jsc: {
			parser: {
				syntax: "typescript",
				tsx: true,
				decorators: true,
			},
			transform: {
				legacyDecorator: true,
				decoratorMetadata: true,
			},
		},
		resolve: {
			alias: [{ find: "@", replacement: "/src" }],
		},
		envDir: "../../",
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: readFileSync(path.resolve("src/shared/scss/tools/index.scss"), {
						encoding: "utf8",
						flag: "r",
					}),
				},
			},
		},
		define: {
			__IS_DEV__: JSON.stringify(true),
			__API__: JSON.stringify("http://localhost:8000"),
		},
	};
});
