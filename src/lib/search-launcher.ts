import type { Engine } from './engines';

export interface LaunchResult {
	opened: string[];
	blocked: string[];
}

/**
 * Opens reverse image search tabs for the given engines.
 * Returns which engines opened successfully vs were blocked by popup blocker.
 */
export function launchSearches(imageUrl: string, selectedEngines: Engine[]): LaunchResult {
	const opened: string[] = [];
	const blocked: string[] = [];

	for (const engine of selectedEngines) {
		const searchUrl = engine.buildUrl(imageUrl);
		const win = window.open(searchUrl, '_blank');
		if (win) {
			opened.push(engine.id);
		} else {
			blocked.push(engine.id);
		}
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
