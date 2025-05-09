<script lang="ts">
  import Database from "@tauri-apps/plugin-sql";

  import Header from "./Header.svelte";
  import Meter from "./Meter.svelte";
  import Add from "./actions/Add.svelte";
  import List from "./List.svelte";
  import Complete from "./actions/Complete.svelte";
  import Toggle from "./actions/Toggle.svelte";
  import Delete from "./actions/Delete.svelte";
  import Placeholder from "./Placeholder.svelte";
  import Reset from "./Reset.svelte";
  import Details from "./Details.svelte";

  let todos: Todo[] = $state([]);
  let complete = $derived(todos.filter((d) => d.status === "complete"));
  let paused = $derived(todos.filter((d) => d.status === "paused"));
  let pending = $derived(todos.filter((d) => d.status === "pending"));

  let value = $state("");

  $effect(() => {
    let dailyReset = false;

    const date = localStorage.getItem("date");
    const ddmmyy = date?.match(/\d+/g);
    if (Array.isArray(ddmmyy) && ddmmyy.length === 3) {
      const [dd, mm, yy] = ddmmyy.map((d) => parseInt(d, 10));
      const today = new Date();
      const [d, m, y] = [
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
      ];

      if (d !== dd || m !== mm || y !== yy) {
        dailyReset = true;
        localStorage.setItem("date", `${d}-${m}-${y}`);
      }
    } else {
      const today = new Date();
      const [d, m, y] = [
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
      ];
      localStorage.setItem("date", `${d}-${m}-${y}`);
    }

    if (dailyReset) {
      resetTodos();
    } else {
      getTodos();
    }
  });

  const addTodo = async () => {
    if (value === "") return;

    const db = await Database.load("sqlite:todos.db");
    await db.execute("INSERT INTO todos (text) VALUES ($1)", [value]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];

    value = "";
  };

  const completeTodo = async (todo: Todo) => {
    const db = await Database.load("sqlite:todos.db");
    await db.execute("UPDATE todos SET status = 'complete' WHERE id = $1", [
      todo.id,
    ]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const toggleTodo = async (todo: Todo) => {
    const db = await Database.load("sqlite:todos.db");
    await db.execute("UPDATE todos SET status = $1 WHERE id = $2", [
      todo.status === "paused" ? "pending" : "paused",
      todo.id,
    ]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const deleteTodo = async (todo: Todo) => {
    const db = await Database.load("sqlite:todos.db");
    await db.execute("DELETE FROM todos WHERE id = $1", [todo.id]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const resetTodos = async () => {
    const db = await Database.load("sqlite:todos.db");
    await db.execute("DELETE FROM todos WHERE status = 'complete'");
    await db.execute("UPDATE todos SET status = 'pending'");
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const getTodos = async () => {
    const db = await Database.load("sqlite:todos.db");
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };
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
    <List items={pending}>
      {#snippet actions(item)}
        <Complete
          onclick={() => {
            completeTodo(item);
          }}
        />
        <Toggle
          onclick={() => {
            toggleTodo(item);
          }}
          pressed={item.status === "paused"}
        />
        <Delete
          onclick={() => {
            deleteTodo(item);
          }}
        />
      {/snippet}
    </List>
  {:else}
    <Placeholder />
  {/if}

  {#if paused.length > 0}
    <Details>
      {#snippet summary()}
        Do later
      {/snippet}
      <List items={paused}>
        {#snippet actions(item)}
          <Complete
            onclick={() => {
              completeTodo(item);
            }}
          />
          <Toggle
            onclick={() => {
              toggleTodo(item);
            }}
            pressed={item.status === "paused"}
          />
          <Delete
            onclick={() => {
              deleteTodo(item);
            }}
          />
        {/snippet}
      </List>
    </Details>
  {/if}

  {#if complete.length > 0}
    <Details>
      {#snippet summary()}
        Completed
      {/snippet}
      <List items={complete}>
        {#snippet actions(item)}
          <Delete
            onclick={() => {
              deleteTodo(item);
            }}
          />
        {/snippet}
      </List>
    </Details>
  {/if}

  {#if paused.length + complete.length > 0}
    <Reset onclick={resetTodos} />
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
