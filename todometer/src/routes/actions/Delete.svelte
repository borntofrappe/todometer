<script lang="ts">
  let { onclick } = $props();
</script>

<button {onclick} class="svg-button" aria-label="Delete todo">
  <svg viewBox="0 -960 960 960" width="1em" height="1em">
    <path
      fill="currentColor"
      d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"
    />
  </svg>
</button>

<style>
  button {
    color: var(--r-2, lightcoral);
  }
</style>
