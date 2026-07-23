declare module '*.module.css' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare interface ImportMetaEnv {
	readonly VITE_APP_VERSION: string;
	readonly VITE_APP_API_URL: string;
}

declare interface ImportMeta {
	readonly env: ImportMetaEnv;
}
