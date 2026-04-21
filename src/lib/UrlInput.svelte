<script lang="ts">
	let { value = $bindable('') }: { value: string } = $props();

	async function pasteFromClipboard() {
		try {
			const text = await navigator.clipboard.readText();
			if (text) value = text.trim();
		} catch {
			// Clipboard API not available or permission denied
		}
	}

	function clear() {
		value = '';
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const url = e.dataTransfer?.getData('text/uri-list') || e.dataTransfer?.getData('text/plain') || '';
		if (url) value = url.trim();
	}

	function handleDragover(e: DragEvent) {
		e.preventDefault();
	}
</script>

<div class="url-input" ondrop={handleDrop} ondragover={handleDragover} role="group" aria-label="URL de l'image">
	<div class="field">
		<svg class="field-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
		</svg>
		<input
			type="url"
			bind:value
			placeholder="https://example.com/image.jpg"
			aria-label="URL de l'image"
		/>
		{#if value}
			<button class="clear-btn" onclick={clear} aria-label="Effacer" title="Effacer">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		{:else}
			<button class="paste-btn" onclick={pasteFromClipboard} aria-label="Coller" title="Coller depuis le presse-papiers">
				<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
					<rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
					<path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
				</svg>
				Coller
			</button>
		{/if}
	</div>
</div>

<style>
	.url-input {
		width: 100%;
	}

	.field {
		position: relative;
		display: flex;
		align-items: center;
	}

	.field-icon {
		position: absolute;
		left: 12px;
		color: var(--text-muted);
		pointer-events: none;
		flex-shrink: 0;
	}

	input {
		width: 100%;
		padding: 11px 90px 11px 36px;
		font-family: inherit;
		font-size: 13px;
		font-weight: 500;
		border: 2px solid var(--border);
		border-radius: var(--radius-md);
		background: var(--surface);
		color: var(--text);
		outline: none;
		transition: border-color 0.2s, box-shadow 0.2s;
	}

	input:focus {
		border-color: var(--accent);
		box-shadow: 0 0 0 3px var(--accent-light);
	}

	input::placeholder {
		color: var(--text-muted);
		font-weight: 400;
	}

	/* Right-side button inside the field */
	.paste-btn,
	.clear-btn {
		position: absolute;
		right: 6px;
		display: flex;
		align-items: center;
		gap: 4px;
		padding: 4px 8px;
		font-family: inherit;
		font-size: 11px;
		font-weight: 600;
		border: none;
		border-radius: var(--radius-sm);
		cursor: pointer;
		transition: all 0.15s;
		white-space: nowrap;
	}

	.paste-btn {
		background: var(--surface-hover);
		color: var(--text-secondary);
	}

	.paste-btn:hover {
		background: var(--accent-light);
		color: var(--accent);
	}

	.clear-btn {
		background: transparent;
		color: var(--text-muted);
	}

	.clear-btn:hover {
		background: var(--surface-hover);
		color: var(--text);
	}
</style>
