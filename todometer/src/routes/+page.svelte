<script lang="ts">
  import Database from "@tauri-apps/plugin-sql";

  import Header from "./Header.svelte";
  import Meter from "./Meter.svelte";
  import Add from "./actions/Add.svelte";
  import Placeholder from "./Placeholder.svelte";

  let todos: Todo[] = $state([]);
  let complete = $derived(todos.filter((d) => d.status === "complete"));
  let paused = $derived(todos.filter((d) => d.status === "paused"));
  let pending = $derived(todos.filter((d) => d.status === "pending"));

  let value = $state("");

  $effect(() => {
    Database.load("sqlite:todos.db").then((db) => {
      db.select("SELECT * FROM todos").then((result) => {
        todos = result as Todo[];
      });
    });
  });

  const addTodo = async () => {
    if (value === "") return;

    const db = await Database.load("sqlite:todos.db");
    await db.execute("INSERT INTO todos (text) VALUES ($1)", [value]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];

    value = "";
  };

  $inspect(todos);
</script>

<div class="root">
  <Header />

  <Meter values={[complete.length, paused.length, pending.length]} />

  <Add
    bind:value
    onsubmit={(event: SubmitEvent) => {
      event.preventDefault();
      addTodo();
    }}
  />

  {#if pending.length > 0}
    <!-- ... -->
  {:else}
    <Placeholder />
  {/if}
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
