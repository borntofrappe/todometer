<script lang="ts">
  import type { Snippet } from "svelte";
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { type } from "@tauri-apps/plugin-os";
  import "../app.css";

  let { children }: { children: Snippet } = $props();

  let maximized = $state(false);
  let fullscreen = $state(false);
  let hasWindowBar = $derived(
    ["windows", "macos", "linux"].includes(type()) && !fullscreen
  );

  const minimize = () => {
    getCurrentWindow().minimize();
  };

  const toggleMaximize = async () => {
    const currentWindow = getCurrentWindow();
    await currentWindow.toggleMaximize();
    maximized = await currentWindow.isMaximized();
  };

  const closeApp = async () => {
    await getCurrentWindow().close();
  };

  const toggleFullscreen = async () => {
    const currentWindow = getCurrentWindow();
    const isFullscreen = await currentWindow.isFullscreen();
    fullscreen = !isFullscreen;
    await currentWindow.setFullscreen(fullscreen);
  };

  const onkeydown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key !== "Control") {
      switch (event.key) {
        case "q":
          closeApp();
          break;
        case "m":
          minimize();
          break;
      }
    } else if (event.key === "F11") {
      toggleFullscreen();
    }
  };
</script>

<svelte:window {onkeydown} />

<div class="window">
  {#if hasWindowBar}
    <div class="window--bar" data-tauri-drag-region>
      <button onclick={minimize} aria-label="Mimimise window">
        <svg viewBox="0 -960 960 960" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M240-440q-17 0-28.5-11.5T200-480q0-17 11.5-28.5T240-520h480q17 0 28.5 11.5T760-480q0 17-11.5 28.5T720-440H240Z"
          />
        </svg>
      </button>
      <button
        aria-pressed={maximized}
        onclick={toggleMaximize}
        aria-label="Maximise window"
      >
        <svg viewBox="0 -960 960 960" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h640q33 0 56.5 23.5T880-720v480q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H160v400Z"
          />
        </svg>
      </button>

      <button onclick={closeApp} aria-label="Close application">
        <svg viewBox="0 -960 960 960" width="1em" height="1em">
          <path
            fill="currentColor"
            d="M480-424 284-228q-11 11-28 11t-28-11q-11-11-11-28t11-28l196-196-196-196q-11-11-11-28t11-28q11-11 28-11t28 11l196 196 196-196q11-11 28-11t28 11q11 11 11 28t-11 28L536-480l196 196q11 11 11 28t-11 28q-11 11-28 11t-28-11L480-424Z"
          />
        </svg>
      </button>
    </div>
  {/if}

  {@render children()}
</div>

<style>
  .window {
    padding-inline: var(--size-2);

    &:has(.window--bar) {
      --window--bar-button-size: 1.8em;
      --window--bar-padding-block: calc(var(--size-1) * 0.5);
      padding-block-start: calc(
        var(--window--bar-button-size) + var(--window--bar-padding-block) * 2
      );

      .window--bar {
        position: fixed;
        inset-inline-start: 0;
        inset-block-start: 0;
        inline-size: 100%;
        padding: var(--size-1);
        padding-block: var(--window--bar-padding-block);
        background: var(--surface-1);
        display: flex;
        gap: var(--size-1);
        justify-content: end;
        z-index: 1;
      }
    }
  }

  button {
    font-size: 1rem;
    cursor: pointer;
    width: var(--window--bar-button-size, 2em);
    height: var(--window--bar-button-size, 2em);
    border-radius: 0.4em;
    padding: 0.4em;
    border: none;
    color: var(--text-2);
    background: none;
    position: relative;
    z-index: 0;

    &::before {
      border-radius: inherit;
      content: "";
      position: absolute;
      inset: 0;
      z-index: -1;
      background: oklch(from currentColor l c h / 0.15);
      transform-origin: 50% 50%;
      opacity: 0;
    }

    &:hover::before {
      opacity: 1;
    }

    &:active::before {
      scale: 0.95;
    }

    > svg {
      display: block;
      width: 100%;
      height: 100%;
    }
  }
</style>
