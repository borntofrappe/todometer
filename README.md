# todometer

Add tasks, complete them to your immediate delight or pause them to take a well-discerned break.

At the beginning of a new day the list is reset, and you get another chance to check old tasks for good.

## Develop

After reading the [prerequisites](https://v2.tauri.app/start/prerequisites/) section to develop Tauri applications, and at least on desktop, you can run the project through Tauri's own CLI.

```sh
pnpm i
pnpm tauri dev
```

## History

[Cassidy Williams built todometer](https://cassidoo.co/post/todometer-build-log/) as "a meter-based to-do list" with React and Electron. Inspired by her success this repository recreates the application with [Svelte](https://svelte.dev/) and [Tauri](https://v2.tauri.app/). Beside the two I use plain CSS for styling with the support of custom properties from [Open Props](https://open-props.style/). On the back-end I manage the tasks in a database and [SQLite](https://www.sqlite.org/).
