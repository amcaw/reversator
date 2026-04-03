<script lang="ts">
	import UrlInput from '$lib/UrlInput.svelte';
	import ImagePreview from '$lib/ImagePreview.svelte';
	import { engines } from '$lib/engines';

	let imageUrl = $state('');

	let isValidUrl = $derived(() => {
		try {
			const u = new URL(imageUrl);
			return u.protocol === 'http:' || u.protocol === 'https:';
		} catch {
			return false;
		}
	});

	let ready = $derived(isValidUrl());

	function openEngine(engineId: string) {
		const engine = engines.find((e) => e.id === engineId);
		if (!engine || !ready) return;
		window.open(engine.buildUrl(imageUrl), '_blank', 'noopener,noreferrer');
	}

	function openAll() {
		if (!ready) return;
		for (const engine of engines) {
			window.open(engine.buildUrl(imageUrl), '_blank', 'noopener,noreferrer');
		}
	}

	function reset() {
		imageUrl = '';
	}
</script>

<div class="widget">

	<p class="instruction">Collez l'URL d'une image publique, puis lancez la recherche sur chaque moteur.</p>

	<UrlInput bind:value={imageUrl} />

	<div class="preview-area">
		{#if imageUrl && ready}
			<ImagePreview url={imageUrl} />
		{:else}
			<div class="preview-placeholder">
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
					<rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
					<circle cx="8.5" cy="8.5" r="1.5"></circle>
					<polyline points="21 15 16 10 5 21"></polyline>
				</svg>
				<span>Aperçu de l'image</span>
			</div>
		{/if}
	</div>

	<div class="engines" class:disabled={!ready}>
		<div class="engines-header">
			<h2>Voir les résultats sur</h2>
			<div class="engines-actions">
				{#if imageUrl}
					<button class="text-btn" onclick={reset}>Effacer</button>
					<span class="sep">·</span>
				{/if}
				<button class="text-btn accent" onclick={openAll} disabled={!ready}>Tout ouvrir</button>
			</div>
		</div>

		<div class="engine-grid">
			{#each engines as engine (engine.id)}
				<button class="engine-card" onclick={() => openEngine(engine.id)} disabled={!ready}>
					<img class="engine-logo" src={engine.logo} alt={engine.name} />
					<span class="engine-name">{engine.name}</span>
					<svg class="open-icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
						<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
						<polyline points="15 3 21 3 21 9"></polyline>
						<line x1="10" y1="14" x2="21" y2="3"></line>
					</svg>
				</button>
			{/each}
		</div>
	</div>
</div>

<style>
	.widget {
		max-width: 480px;
		margin: 0 auto;
		padding: 16px 16px 20px;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.instruction {
		font-size: 12px;
		font-weight: 400;
		color: var(--text-secondary);
		margin: 0;
		line-height: 1.5;
	}

	/* Preview */
	.preview-area {
		aspect-ratio: 16 / 9;
	}

	.preview-placeholder {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 100%;
		border: 2px dashed var(--border);
		border-radius: var(--radius-md);
		color: var(--text-muted);
	}

	.preview-placeholder span {
		font-size: 11px;
		font-weight: 500;
	}

	/* Engines */
	.engines {
		transition: opacity 0.2s;
	}

	.engines.disabled {
		opacity: 0.35;
		pointer-events: none;
	}

	.engines-header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 6px;
	}

	h2 {
		font-size: 10px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		margin: 0;
	}

	.engines-actions {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.text-btn {
		background: none;
		border: none;
		font-family: inherit;
		font-size: 11px;
		font-weight: 600;
		color: var(--text-muted);
		cursor: pointer;
		padding: 2px 4px;
		border-radius: var(--radius-sm);
		transition: all 0.15s;
	}

	.text-btn:hover:not(:disabled) {
		color: var(--text);
	}

	.text-btn.accent {
		color: var(--accent);
	}

	.text-btn.accent:hover:not(:disabled) {
		background: var(--accent-light);
	}

	.text-btn:disabled {
		cursor: not-allowed;
	}

	.sep {
		color: var(--text-muted);
		font-size: 10px;
	}

	/* Engine grid — 2 columns on wide, 1 on narrow */
	.engine-grid {
		display: flex;
		flex-direction: column;
		gap: 4px;
	}

	.engine-card {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 8px 10px;
		border: 1.5px solid var(--border-light);
		border-radius: var(--radius-sm);
		background: var(--bg);
		cursor: pointer;
		transition: all 0.15s;
		font-family: inherit;
		text-align: left;
		width: 100%;
	}

	.engine-card:hover:not(:disabled) {
		border-color: var(--accent);
		background: var(--accent-light);
	}

	.engine-card:active:not(:disabled) {
		transform: scale(0.98);
	}

	.engine-card:disabled {
		cursor: not-allowed;
	}

	.engine-logo {
		width: 18px;
		height: 18px;
		flex-shrink: 0;
		object-fit: contain;
	}

	.engine-name {
		flex: 1;
		font-size: 12px;
		font-weight: 600;
		color: var(--text);
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.open-icon {
		color: var(--text-muted);
		flex-shrink: 0;
		transition: color 0.15s;
	}

	.engine-card:hover:not(:disabled) .open-icon {
		color: var(--accent);
	}

</style>
