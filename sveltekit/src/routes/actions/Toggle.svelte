<script lang="ts">
	import { enhance } from '$app/forms';

	let { item }: { item: Todo } = $props();
</script>

<form use:enhance method="POST" action="?/toggle">
	<input type="hidden" name="id" value={item.id} />

	<button aria-pressed={item.status === 'paused'} class="svg-button" aria-label="Toggle pause status">
		<svg viewBox="0 -960 960 960" width="1em" height="1em">
			<path
				fill="currentColor"
				d={item.status === 'paused'
					? 'M240-240v-480h80v480h-80Zm160 0 400-240-400-240v480Z'
					: 'M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z'}
			/>
		</svg>
	</button>
</form>

<style>
	button {
		color: var(--y-2, khaki);
	}
</style>
