<script lang="ts">
	import Header from './Header.svelte';
	import Meter from './Meter.svelte';

	let { data } = $props();
	let complete = $derived(data.tasks.filter((d) => d.status === 'complete'));
	let paused = $derived(data.tasks.filter((d) => d.status === 'paused'));
	let left = $derived(data.tasks.filter((d) => d.status === 'pending'));
</script>

<div class="root">
	<Header />

	<Meter values={[complete.length, paused.length, left.length]} />
</div>

<style>
	.root {
		padding: var(--size-3) var(--size-2);
		max-inline-size: var(--size-content-3);
		margin-inline: auto;

		> :global(* + *) {
			margin-block-start: var(--size-5);
		}
	}
</style>
