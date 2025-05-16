<script lang="ts">
  let { onclick } = $props();
</script>

<button {onclick} class="svg-button" aria-label="Complete todo">
  <svg viewBox="0 -960 960 960" width="1em" height="1em">
    <path
      fill="currentColor"
      d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"
    />
  </svg>
</button>

<style>
  button {
    color: var(--green, lightgreen);
  }
</style>
