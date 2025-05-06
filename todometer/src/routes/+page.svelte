<script lang="ts">
  import Database from "@tauri-apps/plugin-sql";

  import Header from "./Header.svelte";
  import Meter from "./Meter.svelte";

  let todos: Todo[] = $state([]);
  let complete = $derived(todos.filter((d) => d.status === "complete"));
  let paused = $derived(todos.filter((d) => d.status === "paused"));
  let pending = $derived(todos.filter((d) => d.status === "pending"));

  $effect(() => {
    Database.load("sqlite:todos.db").then((db) => {
      db.select("SELECT * FROM todos").then((result) => {
        todos = result as Todo[];
      });
    });
  });
</script>

<div class="root">
  <Header />

  <Meter values={[complete.length, paused.length, pending.length]} />
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
