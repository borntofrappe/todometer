<script lang="ts">
	import Header from './Header.svelte';
	import Meter from './Meter.svelte';
</script>

<div class="root">
	<Header />

	<Meter values={[2, 2, 2]} />
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
