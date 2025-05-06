# todometer

[Cassidy Williams built todometer](https://cassidoo.co/post/todometer-build-log/) as "a meter-based to-do list". This repository is meant to recreate the application to practice with [Svelte](https://svelte.dev/), but mostly to learn [Tauri](https://v2.tauri.app/).

## sveltekit

Sub-folder used to design the application and develop the basic logic with [SvelteKit form actions](https://svelte.dev/docs/kit/form-actions).

"Database" in `lib/server/database.ts` is a simple array. There is no concept of persisting storage as the app focuses more on the interaction than creating the final app. 

Styles with CSS and custom properties from [Open Props](https://open-props.style/).

## todometer

Sub-folder creating the application with Tauri. 

Database is a SQLite database managed with [tauri-plugin-sql](https://v2.tauri.app/plugin/sql/).