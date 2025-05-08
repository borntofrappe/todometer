<script lang="ts">
  let { pressed, onclick } = $props();
</script>

<button
  {onclick}
  aria-pressed={pressed}
  class="svg-button"
  aria-label="Toggle pending status"
>
  <svg viewBox="0 -960 960 960" width="1em" height="1em">
    <path
      fill="currentColor"
      d={pressed
        ? "M240-240v-480h80v480h-80Zm160 0 400-240-400-240v480Z"
        : "M560-200v-560h160v560H560Zm-320 0v-560h160v560H240Z"}
    />
  </svg>
</button>

<style>
  button {
    color: var(--y-2, khaki);
  }
</style>
