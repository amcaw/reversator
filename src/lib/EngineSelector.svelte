<script lang="ts">
	import { engines } from './engines';
	import { browser } from '$app/environment';

	let { selected = $bindable<string[]>([]) }: { selected: string[] } = $props();

	const STORAGE_KEY = 'reversator-engines-v2';

	if (browser) {
		try {
			const stored = localStorage.getItem(STORAGE_KEY);
			if (stored) {
				selected = JSON.parse(stored);
			} else {
				selected = engines.filter((e) => e.enabledByDefault).map((e) => e.id);
			}
		} catch {
			selected = engines.filter((e) => e.enabledByDefault).map((e) => e.id);
		}
	} else {
		selected = engines.filter((e) => e.enabledByDefault).map((e) => e.id);
	}

	$effect(() => {
		if (browser) {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selected));
		}
	});

	function toggle(id: string) {
		if (selected.includes(id)) {
			selected = selected.filter((s) => s !== id);
		} else {
			selected = [...selected, id];
		}
	}

	function selectAll() {
		selected = engines.map((e) => e.id);
	}

	function clearAll() {
		selected = [];
	}
</script>

<div class="engine-selector">
	<div class="header">
		<h2>Moteurs de recherche</h2>
		<div class="header-actions">
			<button class="text-btn" onclick={selectAll}>Tout</button>
			<span class="sep">/</span>
			<button class="text-btn" onclick={clearAll}>Aucun</button>
		</div>
	</div>

	<div class="engine-grid">
		{#each engines as engine (engine.id)}
			<button
				class="engine-card"
				class:active={selected.includes(engine.id)}
				onclick={() => toggle(engine.id)}
				aria-pressed={selected.includes(engine.id)}
			>
				<img class="engine-logo" src={engine.logo} alt="{engine.name}" />
				<span class="engine-name">{engine.name}</span>
				<div class="check-indicator">
					{#if selected.includes(engine.id)}
						<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
							<polyline points="20 6 9 17 4 12"></polyline>
						</svg>
					{/if}
				</div>
			</button>
		{/each}
	</div>
</div>

<style>
	.engine-selector {
		width: 100%;
	}

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin-bottom: 12px;
	}

	h2 {
		font-size: 11px;
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--text-muted);
		margin: 0;
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 4px;
	}

	.text-btn {
		background: none;
		border: none;
		color: var(--accent);
		font-family: inherit;
		font-size: 12px;
		font-weight: 600;
		cursor: pointer;
		padding: 2px 4px;
		border-radius: var(--radius-sm);
		transition: background 0.15s;
	}

	.text-btn:hover {
		background: var(--accent-light);
	}

	.sep {
		color: var(--text-muted);
		font-size: 11px;
	}

	.engine-grid {
		display: flex;
		flex-direction: column;
		gap: 6px;
	}

	.engine-card {
		display: flex;
		align-items: center;
		gap: 12px;
		padding: 10px 14px;
		border: 2px solid var(--border-light);
		border-radius: var(--radius-md);
		background: var(--bg);
		cursor: pointer;
		transition: all 0.15s;
		font-family: inherit;
		text-align: left;
		width: 100%;
	}

	.engine-card:hover {
		border-color: var(--border);
		background: var(--surface);
	}

	.engine-card.active {
		border-color: var(--accent);
		background: var(--accent-light);
	}

	.engine-card.active:hover {
		background: var(--accent-light);
	}

	.engine-logo {
		width: 24px;
		height: 24px;
		flex-shrink: 0;
		object-fit: contain;
	}

	.engine-name {
		flex: 1;
		font-size: 14px;
		font-weight: 500;
		color: var(--text);
	}

	.check-indicator {
		width: 22px;
		height: 22px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		background: var(--surface);
		border: 2px solid var(--border);
		transition: all 0.15s;
		color: white;
	}

	.engine-card.active .check-indicator {
		background: var(--accent);
		border-color: var(--accent);
	}
</style>
