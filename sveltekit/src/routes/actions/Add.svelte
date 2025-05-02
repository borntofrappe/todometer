<script lang="ts">
	import { enhance } from '$app/forms';
</script>

<form use:enhance method="POST" action="?/add">
	<input id="text" name="text" type="text" placeholder="Add new item" required />
	<button class="svg-button" aria-label="Add new item">
		<svg viewBox="0 -960 960 960" width="1em" height="1em">
			<path fill="currentColor" d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
		</svg>
	</button>
</form>

<style>
	form {
		position: relative;
		--_inline-padding: var(--size-3);
		--_button-size: 2em;

		input {
			font-size: var(--font-size-2);
			inline-size: 100%;
			color: var(--text-1);
			background: var(--surface-1);
			border: none;
			padding: var(--size-3) var(--_inline-padding);
			padding-inline-end: calc(var(--_inline-padding) + var(--_button-size));

			&::placeholder {
				color: var(--text-3);
				font-weight: 300;
			}

			&:focus {
				outline: none;
			}
		}

		button {
			--button-size: var(--_button-size);
			position: absolute;
			inset-block-start: 50%;
			inset-inline-end: var(--_inline-padding);
			translate: 0% -50%;
		}
	}
</style>
