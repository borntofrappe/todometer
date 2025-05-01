<script lang="ts">
	import Header from './Header.svelte';
	import Meter from './Meter.svelte';
	import Add from './Add.svelte';
	import Placeholder from './Placeholder.svelte';
	import List from './List.svelte';

	let { data } = $props();
	let complete = $derived(data.todos.filter((d) => d.status === 'complete'));
	let paused = $derived(data.todos.filter((d) => d.status === 'paused'));
	let pending = $derived(data.todos.filter((d) => d.status === 'pending'));
</script>

<div class="root">
	<Header />

	<Meter values={[complete.length, paused.length, pending.length]} />

	<Add />

	{#if pending.length > 0}
		<List items={pending} />
	{:else}
		<Placeholder />
	{/if}
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
