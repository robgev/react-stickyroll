import {JSDOM} from "jsdom";

declare global {
	namespace NodeJS {
		interface Global {
			document: Document;
			window: Window;
			navigator: Navigator | {userAgent: string};
			requestAnimationFrame: (callback: any) => Timeout;
			cancelAnimationFrame: (id: any) => void;
			CSS: {supports: (property: string, value: string) => boolean};
		}
	}
}

export const initDOM = () => {
	const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
	const {window} = jsdom;

	function copyProps(src, target) {
		Object.defineProperties(target, {
			...Object.getOwnPropertyDescriptors(src),
			...Object.getOwnPropertyDescriptors(target)
		});
	}

	global.window = window;
	global.document = window.document;
	global.navigator = {
		userAgent: "node.js"
	};
	global.requestAnimationFrame = function(callback) {
		return setTimeout(callback, 0);
	};
	global.cancelAnimationFrame = function(id) {
		clearTimeout(id);
	};
	global.CSS = {
		supports: function(property: string, value: string): boolean {
			// always supported
			return true;
		}
	};
	copyProps(window, global);
};
