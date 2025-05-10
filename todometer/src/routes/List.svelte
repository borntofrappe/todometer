<script lang="ts">
  import type { Snippet } from "svelte";

  let { items, actions }: { items: Todo[]; actions: Snippet<[Todo]> } =
    $props();
</script>

<ul>
  {#each items as item}
    <li>
      <span>{item.text}</span>

      <div>
        {@render actions(item)}
      </div>
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
    display: flex;
    gap: var(--size-1);
    align-items: center;
    color: var(--text-1);
    background: var(--surface-1);
    padding: var(--size-4) var(--size-3);

    span {
      flex-grow: 1;
    }

    div {
      display: flex;
      gap: 1px;
      align-items: center;
    }
  }
</style>
