<script lang="ts">
	import { enhance } from '$app/forms';

	let { item }: { item: Todo } = $props();
</script>

<form use:enhance method="POST" action="?/complete">
	<input type="hidden" name="id" value={item.id} />

	<button class="svg-button" aria-label="Complete todo">
		<svg viewBox="0 -960 960 960" width="1em" height="1em">
			<path fill="currentColor" d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
		</svg>
	</button>
</form>

<style>
	button {
		color: var(--g-2, lightgreen);
	}
</style>
