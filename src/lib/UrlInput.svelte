<script lang="ts">
	let { value = $bindable(''), onsubmit }: { value: string; onsubmit?: () => void } = $props();

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			onsubmit?.();
		}
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		const url = e.dataTransfer?.getData('text/uri-list') || e.dataTransfer?.getData('text/plain') || '';
		if (url) {
			value = url.trim();
			onsubmit?.();
		}
	}

	function handleDragover(e: DragEvent) {
		e.preventDefault();
	}
</script>

<div class="url-input" ondrop={handleDrop} ondragover={handleDragover} role="group" aria-label="URL de l'image">
	<div class="field">
		<svg class="field-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/>
			<path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
		</svg>
		<input
			type="url"
			bind:value
			placeholder="https://example.com/image.jpg"
			onkeydown={handleKeydown}
			aria-label="URL de l'image"
		/>
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
		left: 14px;
		color: var(--text-muted);
		pointer-events: none;
		flex-shrink: 0;
	}

	input {
		width: 100%;
		padding: 12px 14px 12px 42px;
		font-family: inherit;
		font-size: 14px;
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
</style>
