<script lang="ts">
  let { onclick } = $props();
</script>

<div>
  <button {onclick}>reset progress</button>
</div>

<style>
  div {
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
