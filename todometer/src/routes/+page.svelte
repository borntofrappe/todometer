<script lang="ts">
  import Header from "./Header.svelte";
</script>

<div class="root">
  <Header />
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
