<script lang="ts">
	import Header from './Header.svelte';
	import Meter from './Meter.svelte';
	import Add from './actions/Add.svelte';
	import Placeholder from './Placeholder.svelte';
	import List from './List.svelte';
	import Details from './Details.svelte';
	import Complete from './actions/Complete.svelte';
	import Toggle from './actions/Toggle.svelte';
	import Delete from './actions/Delete.svelte';

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
		<List items={pending}>
			{#snippet actions(item)}
				<Complete {item} />
				<Toggle {item} />
				<Delete {item} />
			{/snippet}
		</List>
	{:else}
		<Placeholder />
	{/if}

	{#if paused.length > 0}
		<Details>
			{#snippet summary()}
				Do later
			{/snippet}

			<List items={paused}>
				{#snippet actions(item)}
					<Complete {item} />
					<Toggle {item} />
					<Delete {item} />
				{/snippet}
			</List>
		</Details>
	{/if}

	{#if complete.length > 0}
		<Details>
			{#snippet summary()}
				Completed
			{/snippet}

			<List items={complete}>
				{#snippet actions(item)}
					<Delete {item} />
				{/snippet}
			</List>
		</Details>
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
