declare module 'pym.js' {
	class Child {
		constructor(config?: { polling?: number; id?: string; renderCallback?: (width: string) => void });
		sendHeight(): void;
		sendMessage(type: string, message: string): void;
		remove(): void;
	}
	class Parent {
		constructor(id: string, url: string, config?: object);
	}
	export { Child, Parent };
}
