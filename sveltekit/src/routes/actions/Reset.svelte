<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="POST" action="?/reset">
	<button>reset progress</button>
</form>

<style>
	form {
		text-align: center;
	}

	button {
		cursor: pointer;
		font-size: var(--font-size-2);
		color: currentColor;
		background: none;
		border: none;
		text-align: center;

		&:hover {
			color: oklch(from currentColor calc(l * 1.1) c h);
		}

		&:focus-visible {
			outline: 2px solid currentColor;
			outline-offset: 2px;
		}
	}
</style>
