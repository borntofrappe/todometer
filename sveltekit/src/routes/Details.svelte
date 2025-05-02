<script lang="ts">
	import type { Snippet } from 'svelte';

	let { summary, children }: { summary: Snippet; children: Snippet } = $props();
</script>

<details>
	<summary>{@render summary()}</summary>

	{@render children()}
</details>

<style>
	summary {
		--_marker-size: 1.5em;
		cursor: pointer;
		display: inline-block;
		font-size: var(--font-size-4);
		font-weight: 700;
		padding-block-end: var(--size-2);
		position: relative;

		padding-inline: var(--_marker-size);

		&::marker {
			content: '';
		}

		&::before {
			content: '';
			mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path fill="currentColor" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>');
			mask-size: 100%;
			mask-repeat: no-repeat;
			background: currentColor;
			inline-size: var(--_marker-size);
			block-size: var(--_marker-size);
			position: absolute;
			inset-inline-start: 0%;
			inset-block-start: 45%;
			translate: 0% -50%;
			transition: rotate 0.2s ease-out;
		}

		details[open] &::before {
			rotate: 90deg;
		}

		&:hover {
			color: oklch(from currentColor calc(l * 1.1) c h);
		}

		&:focus-visible {
			outline: none;
			animation: highlight var(--highlight-duration, 0.5s) var(--highlight-easing, ease-out);
		}
	}

	@keyframes highlight {
		60% {
			filter: saturate(150%) drop-shadow(0 0 5px oklch(from currentColor calc(l * 1.5) c h));
		}
	}
</style>
