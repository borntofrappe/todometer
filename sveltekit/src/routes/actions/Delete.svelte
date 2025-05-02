<script lang="ts">
	import { enhance } from '$app/forms';

	let { item }: { item: Todo } = $props();
</script>

<form use:enhance method="POST" action="?/delete">
	<input type="hidden" name="id" value={item.id} />

	<button class="svg-button" aria-label="Delete todo">
		<svg viewBox="0 -960 960 960" width="1em" height="1em">
			<path
				fill="currentColor"
				d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
			/>
		</svg>
	</button>
</form>

<style>
	button {
		color: var(--r-2, lightcoral);
	}
</style>
