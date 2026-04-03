<script lang="ts">
	import UrlInput from '$lib/UrlInput.svelte';
	import ImagePreview from '$lib/ImagePreview.svelte';
	import EngineSelector from '$lib/EngineSelector.svelte';
	import { engines } from '$lib/engines';
	import { launchSearches, buildSearchLinks } from '$lib/search-launcher';

	let imageUrl = $state('');
	let selectedEngineIds = $state<string[]>([]);

	let searchResult = $state<{ opened: number; blocked: number } | null>(null);
	let fallbackLinks = $state<{ engine: { id: string; name: string; logo: string }; url: string }[]>([]);

	let isValidUrl = $derived(() => {
		try {
			const u = new URL(imageUrl);
			return u.protocol === 'http:' || u.protocol === 'https:';
		} catch {
			return false;
		}
	});

	let selectedEngines = $derived(
		engines.filter((e) => selectedEngineIds.includes(e.id))
	);

	let canSearch = $derived(isValidUrl() && selectedEngines.length > 0);

	function handleSearch() {
		if (!canSearch) return;

		searchResult = null;
		fallbackLinks = [];

		const result = launchSearches(imageUrl, selectedEngines);

		searchResult = {
			opened: result.opened.length,
			blocked: result.blocked.length
		};

		if (result.blocked.length > 0) {
			const blockedEngines = engines.filter((e) => result.blocked.includes(e.id));
			fallbackLinks = buildSearchLinks(imageUrl, blockedEngines);
		}
	}

	function reset() {
		imageUrl = '';
		searchResult = null;
		fallbackLinks = [];
	}
</script>

<div class="widget">
	<!-- Header -->
	<header>
		<div class="title-row">
			<div class="logo-mark">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="11" cy="11" r="8"></circle>
					<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
				</svg>
			</div>
			<div>
				<h1>Reversator</h1>
				<p class="tagline">Recherche d'image inversée multi-moteurs</p>
			</div>
		</div>
	</header>

	<!-- Input -->
	<section class="section">
		<p class="instruction">Collez l'URL d'une image publique, sélectionnez vos moteurs et lancez la recherche. Aucune donnée n'est stockée.</p>
		<UrlInput bind:value={imageUrl} onsubmit={handleSearch} />
	</section>

	<!-- Preview -->
	{#if imageUrl}
		<section class="section">
			<ImagePreview url={imageUrl} />
		</section>
	{/if}

	<!-- Engines -->
	<section class="section">
		<EngineSelector bind:selected={selectedEngineIds} />
	</section>

	<!-- Actions -->
	<section class="actions">
		<button class="search-btn" onclick={handleSearch} disabled={!canSearch}>
			<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
				<circle cx="11" cy="11" r="8"></circle>
				<line x1="21" y1="21" x2="16.65" y2="16.65"></line>
			</svg>
			Rechercher sur {selectedEngines.length} moteur{selectedEngines.length !== 1 ? 's' : ''}
		</button>

		{#if imageUrl}
			<button class="clear-btn" onclick={reset}>Effacer</button>
		{/if}
	</section>

	<!-- Results -->
	{#if searchResult}
		<section class="section">
			{#if searchResult.opened > 0}
				<div class="result result-success">
					<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<polyline points="20 6 9 17 4 12"></polyline>
					</svg>
					{searchResult.opened} onglet{searchResult.opened !== 1 ? 's' : ''} ouvert{searchResult.opened !== 1 ? 's' : ''}
				</div>
			{/if}

			{#if searchResult.blocked > 0}
				<div class="result result-blocked">
					<div class="blocked-header">
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<circle cx="12" cy="12" r="10"></circle>
							<line x1="12" y1="8" x2="12" y2="12"></line>
							<line x1="12" y1="16" x2="12.01" y2="16"></line>
						</svg>
						<span>
							{searchResult.blocked} onglet{searchResult.blocked !== 1 ? 's' : ''} bloqué{searchResult.blocked !== 1 ? 's' : ''} par votre navigateur. Cliquez ci-dessous :
						</span>
					</div>
					<ul class="fallback-links">
						{#each fallbackLinks as link (link.engine.id)}
							<li>
								<a href={link.url} target="_blank" rel="noopener noreferrer">
									<img src={link.engine.logo} alt="{link.engine.name}" class="fallback-logo" />
									{link.engine.name}
									<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
										<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
										<polyline points="15 3 21 3 21 9"></polyline>
										<line x1="10" y1="14" x2="21" y2="3"></line>
									</svg>
								</a>
							</li>
						{/each}
					</ul>
				</div>
			{/if}
		</section>
	{/if}
</div>

<style>
	.widget {
		max-width: 540px;
		margin: 0 auto;
		padding: 28px 24px 36px;
	}

	/* Header */
	header {
		margin-bottom: 24px;
	}

	.title-row {
		display: flex;
		align-items: center;
		gap: 14px;
	}

	.logo-mark {
		width: 44px;
		height: 44px;
		border-radius: var(--radius-md);
		background: var(--accent);
		color: var(--accent-text);
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
	}

	h1 {
		font-size: 22px;
		font-weight: 700;
		color: var(--text);
		margin: 0;
		letter-spacing: -0.02em;
		line-height: 1.2;
	}

	.tagline {
		font-size: 13px;
		font-weight: 500;
		color: var(--text-muted);
		margin: 2px 0 0;
	}

	/* Sections */
	.section {
		margin-bottom: 20px;
	}

	.instruction {
		font-size: 13px;
		font-weight: 400;
		color: var(--text-secondary);
		margin: 0 0 12px;
		line-height: 1.6;
	}

	/* Actions */
	.actions {
		display: flex;
		gap: 10px;
		margin-bottom: 20px;
	}

	.search-btn {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 13px 24px;
		font-family: inherit;
		font-size: 14px;
		font-weight: 700;
		background: var(--accent);
		color: var(--accent-text);
		border: none;
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.15s;
		letter-spacing: 0.01em;
	}

	.search-btn:hover:not(:disabled) {
		background: var(--accent-hover);
		box-shadow: var(--shadow-md);
	}

	.search-btn:active:not(:disabled) {
		transform: scale(0.98);
	}

	.search-btn:disabled {
		opacity: 0.35;
		cursor: not-allowed;
	}

	.clear-btn {
		padding: 13px 20px;
		font-family: inherit;
		font-size: 13px;
		font-weight: 600;
		background: var(--surface);
		color: var(--text-secondary);
		border: 2px solid var(--border);
		border-radius: var(--radius-md);
		cursor: pointer;
		transition: all 0.15s;
	}

	.clear-btn:hover {
		border-color: var(--text-muted);
		color: var(--text);
	}

	.clear-btn:active {
		transform: scale(0.97);
	}

	/* Results */
	.result {
		padding: 14px 16px;
		border-radius: var(--radius-md);
		font-size: 13px;
		font-weight: 600;
	}

	.result-success {
		display: flex;
		align-items: center;
		gap: 8px;
		background: var(--success-light);
		color: var(--success);
	}

	.result-blocked {
		background: var(--surface);
		border: 1px solid var(--border-light);
		margin-top: 8px;
	}

	.blocked-header {
		display: flex;
		align-items: flex-start;
		gap: 8px;
		color: var(--text-muted);
		font-weight: 500;
		margin-bottom: 10px;
	}

	.blocked-header svg {
		flex-shrink: 0;
		margin-top: 1px;
	}

	.fallback-links {
		list-style: none;
		padding: 0;
		margin: 0;
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.fallback-links a {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 8px 10px;
		border-radius: var(--radius-sm);
		color: var(--accent);
		text-decoration: none;
		font-size: 13px;
		font-weight: 600;
		transition: background 0.15s;
	}

	.fallback-links a:hover {
		background: var(--accent-light);
	}

	.fallback-links a svg {
		margin-left: auto;
		opacity: 0.5;
	}

	.fallback-logo {
		width: 18px;
		height: 18px;
		object-fit: contain;
	}
</style>
