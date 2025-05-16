<script lang="ts">
  let { values }: { values: [number, number, number] } = $props();
</script>

<div class="meter">
  <div style:flex-grow={values[0]} data-value="complete"></div>
  <div style:flex-grow={values[1]} data-value="paused"></div>
  <div style:flex-grow={values[2]} data-value="rest"></div>
</div>

<style>
  .meter {
    display: block;
    inline-size: 100%;
    aspect-ratio: 42/1;
    min-block-size: 1ex;
    background: var(--surface-1);

    display: flex;

    > div {
      flex-grow: 1;
      transition: flex-grow 0.2s var(--highlight-easing, ease-out);

      &[data-value] {
        flex-grow: 0;
      }

      &[data-value="complete"] {
        background: var(--green, lightgreen);
      }

      &[data-value="paused"] {
        background: var(--yellow, khaki);
      }
    }
  }
</style>
