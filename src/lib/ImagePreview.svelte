<script lang="ts">
	let { url }: { url: string } = $props();

	let loaded = $state(false);
	let error = $state(false);

	$effect(() => {
		url;
		loaded = false;
		error = false;
	});
</script>

<div class="preview" class:has-image={loaded && !error}>
	{#if url}
		<img
			src={url}
			alt="Aperçu"
			onload={() => { loaded = true; error = false; }}
			onerror={() => { loaded = false; error = true; }}
			class:visible={loaded && !error}
		/>
		{#if error}
			<div class="status error">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<circle cx="12" cy="12" r="10"></circle>
					<line x1="15" y1="9" x2="9" y2="15"></line>
					<line x1="9" y1="9" x2="15" y2="15"></line>
				</svg>
				<span>Impossible de charger l'image. Vérifiez l'URL.</span>
			</div>
		{:else if !loaded}
			<div class="status loading">
				<div class="spinner"></div>
				<span>Chargement...</span>
			</div>
		{/if}
	{/if}
</div>

<style>
	.preview {
		width: 100%;
		aspect-ratio: 16 / 9;
		border-radius: var(--radius-md);
		overflow: hidden;
		background: var(--surface);
		border: 2px solid var(--border-light);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: border-color 0.25s;
	}

	.preview.has-image {
		border-color: var(--accent);
	}

	img {
		display: none;
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	img.visible {
		display: block;
	}

	.status {
		display: flex;
		align-items: center;
		gap: 10px;
		padding: 14px 18px;
		font-size: 13px;
		font-weight: 500;
	}

	.status.error {
		color: var(--error);
	}

	.status.loading {
		color: var(--text-muted);
	}

	.spinner {
		width: 16px;
		height: 16px;
		border: 2.5px solid var(--border);
		border-top-color: var(--accent);
		border-radius: 50%;
		animation: spin 0.7s linear infinite;
	}

	@keyframes spin {
		to { transform: rotate(360deg); }
	}
</style>
