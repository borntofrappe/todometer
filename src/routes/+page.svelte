<script lang="ts">
  import { load } from "@tauri-apps/plugin-store";
  import { onMount } from "svelte";
  import { fade } from "svelte/transition";

  import Database from "@tauri-apps/plugin-sql";

  import {
    isPermissionGranted,
    requestPermission,
    sendNotification,
  } from "@tauri-apps/plugin-notification";

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
  let firstPaint = $state(false);

  const DB_PATH = "sqlite:todos.db";
  const STORE_PATH = "store.json";
  const STORE_KEY = "date";
  type Result = {
    date: string;
  };

  onMount(async () => {
    let dailyReset = false;

    const store = await load(STORE_PATH, { autoSave: false });
    const result = await store.get<Result>(STORE_KEY);
    if (result) {
      const { date } = result;
      const ddmmyy = date.match(/\d+/g);
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
          await store.set(STORE_KEY, { date: `${d}-${m}-${y}` });
        }
      }
    } else {
      const today = new Date();
      const [d, m, y] = [
        today.getDate(),
        today.getMonth(),
        today.getFullYear(),
      ];
      await store.set(STORE_KEY, { date: `${d}-${m}-${y}` });
    }

    if (dailyReset) {
      await resetTodos();
      notify({
        title: "It's a new day!",
        body: "Your todos have been reset",
      });
    } else {
      await getTodos();
    }
    firstPaint = true;
  });

  const addTodo = async () => {
    if (value === "") return;

    const db = await Database.load(DB_PATH);
    await db.execute("INSERT INTO todos (text) VALUES ($1)", [value]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];

    value = "";
  };

  const completeTodo = async (todo: Todo) => {
    const db = await Database.load(DB_PATH);
    await db.execute("UPDATE todos SET status = 'complete' WHERE id = $1", [
      todo.id,
    ]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const toggleTodo = async (todo: Todo) => {
    const db = await Database.load(DB_PATH);
    await db.execute("UPDATE todos SET status = $1 WHERE id = $2", [
      todo.status === "paused" ? "pending" : "paused",
      todo.id,
    ]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const deleteTodo = async (todo: Todo) => {
    const db = await Database.load(DB_PATH);
    await db.execute("DELETE FROM todos WHERE id = $1", [todo.id]);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const resetTodos = async (notify: boolean = false) => {
    const db = await Database.load(DB_PATH);
    await db.execute("DELETE FROM todos WHERE status = 'complete'");
    await db.execute("UPDATE todos SET status = 'pending'");
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const getTodos = async () => {
    const db = await Database.load(DB_PATH);
    todos = (await db.select("SELECT * FROM todos")) as Todo[];
  };

  const notify = async ({ title, body }: { title: string; body: string }) => {
    let permissionGranted = await isPermissionGranted();
    if (!permissionGranted) {
      permissionGranted = (await requestPermission()) === "granted";
    }
    if (permissionGranted) {
      sendNotification({
        title,
        body,
      });
    }
  };
</script>

{#if firstPaint}
  <div in:fade class="root">
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
{/if}

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
