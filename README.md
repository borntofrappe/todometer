# todometer

[Cassidy Williams built todometer](https://cassidoo.co/post/todometer-build-log/) as "a meter-based to-do list". This repository is meant to recreate the application to practice with [Svelte](https://svelte.dev/), but mostly to learn [Tauri](https://v2.tauri.app/).

In terms of style there is just CSS and custom properties from [Open Props](https://open-props.style/).

## sveltekit

The sub-folder helped to design the application with Svelte and SvelteKit. It might still help to provide a quit frontend to experiment.

```sh
cd sveltekit
pnpm i
pnpm dev
```

Of note: the application works with [SvelteKit form actions](https://svelte.dev/docs/kit/form-actions) and a server, although there is no concept of storage. The code sadly does not carry to the Tauri app.

## todometer

The sub-folder creates the application with Tauri and a Svelte frontend. Persistent storage works with an SQLite database and [Tauri's SQL plugin](https://v2.tauri.app/plugin/sql/).

```sh
cd todometer
pnpm i
pnpm tauri dev
```
