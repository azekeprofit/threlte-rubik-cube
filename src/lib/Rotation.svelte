<script lang="ts">
  import { T, useTask } from "@threlte/core";
  import Cube from "./Cube.svelte";
  import { type CubeColor, positions, type rotAxisType } from "./model.svelte";

  let x = -6.087414455248885;
  let y = 2.4046333628934424;
  let z = 2.335561018356455;

  const {
    whichAxis,
    rotAxis,
    reverse,
  }: {
    whichAxis: (typeof positions)[number];
    rotAxis: rotAxisType;
    reverse: boolean;
  } = $props();

  import { SvelteMap } from "svelte/reactivity";
  let colors = new SvelteMap<string, CubeColor>();

  let rotation = $state(0);
  const { start, stop, started } = useTask(
    (delta) => {
      rotation += delta * (reverse ? -2 : 2);
    },
    { autoStart: true }
  );
</script>

{#if rotAxis == "x"}
  {#each positions as x}
    <T.Group rotation.x={x == whichAxis ? rotation : 0}>
      {#each positions as y}
        {#each positions as z}
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "y"}
  {#each positions as y}
    <T.Group rotation.y={y == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as z}
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}

{#if rotAxis == "z"}
  {#each positions as z}
    <T.Group rotation.z={z == whichAxis ? rotation : 0}>
      {#each positions as x}
        {#each positions as y}
          {#if !(x == 0 && x == y && y == z)}
            <Cube position={[x, y, z]} {colors} />
          {/if}
        {/each}
      {/each}
    </T.Group>
  {/each}
{/if}
