import type { Engine } from './engines';

export interface LaunchResult {
	opened: string[];
	blocked: string[];
}

/**
 * Opens reverse image search tabs for the given engines.
 * All window.open() calls are synchronous within the same call stack
 * to maximize the chance browsers treat them as a single user gesture.
 * The 'noopener,noreferrer' features detach the opened tabs for security.
 */
export function launchSearches(imageUrl: string, selectedEngines: Engine[]): LaunchResult {
	const opened: string[] = [];
	const blocked: string[] = [];

	for (const engine of selectedEngines) {
		const url = engine.buildUrl(imageUrl);
		const win = window.open(url, '_blank', 'noopener,noreferrer');
		(win ? opened : blocked).push(engine.id);
	}

	return { opened, blocked };
}

/**
 * Builds a list of {engine, url} pairs for fallback display when popups are blocked.
 */
export function buildSearchLinks(imageUrl: string, engines: Engine[]): { engine: Engine; url: string }[] {
	return engines.map((engine) => ({
		engine,
		url: engine.buildUrl(imageUrl)
	}));
}
