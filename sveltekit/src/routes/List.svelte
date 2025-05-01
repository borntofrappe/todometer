<script lang="ts">
	let { items }: { items: Todo[] } = $props();
</script>

<ul>
	{#each items as item}
		<li>
			{item.text}
		</li>
	{/each}
</ul>

<style>
	ul {
		list-style: none;

		> * + * {
			margin-block-start: var(--size-2);
		}
	}

	li {
		color: var(--text-1);
		background: var(--surface-1);
		padding: var(--size-4) var(--size-3);
	}
</style>
